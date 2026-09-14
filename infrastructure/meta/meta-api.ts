import "server-only";

import {
  META_ACCOUNTS_LIMIT,
  META_AD_ACCOUNT_FIELDS,
  META_AUTH_TYPE,
  META_BUSINESS_ACCOUNT_EDGES,
  META_CAMPAIGN_FIELDS,
  META_DIALOG_URL,
  META_GRAPH_URL,
  META_INSIGHTS_DATE_PRESET,
  META_INSIGHTS_LEVEL,
  META_INSIGHTS_LIMIT,
  META_INSIGHT_FIELDS,
  META_SCOPES,
} from "@/constants/meta-ads.constants";
import { getMetaCredentials } from "@/infrastructure/meta/meta-env";
import type {
  MetaAdAccount,
  MetaCampaign,
  MetaInsightsPayload,
  MetaToken,
} from "@/domain/entities/meta-ads";
import { getJson, getJsonOrThrow } from "@/infrastructure/meta/meta-http";
import { toCampaignMetrics } from "@/infrastructure/meta/meta-insights-mapper";

/** URL del diálogo de consentimiento de Meta. */
export function buildMetaAuthorizationUrl(
  state: string,
  redirectUri: string,
): string | null {
  const credentials = getMetaCredentials();
  if (!credentials) return null;

  const params = new URLSearchParams({
    client_id: credentials.appId,
    redirect_uri: redirectUri,
    scope: META_SCOPES.join(","),
    response_type: "code",
    // Sin esto Meta salta el diálogo cuando ya hay permisos concedidos, y nunca
    // llega a preguntar por los que faltan ni por las cuentas a las que dar
    // acceso. Reautorizar existe justamente para volver a esa pantalla.
    auth_type: META_AUTH_TYPE,
    state,
  });

  return `${META_DIALOG_URL}?${params}`;
}

/** Canjea el código de autorización por un token de corta duración. */
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string,
): Promise<string | null> {
  const credentials = getMetaCredentials();
  if (!credentials) return null;

  const params = new URLSearchParams({
    client_id: credentials.appId,
    client_secret: credentials.appSecret,
    redirect_uri: redirectUri,
    code,
  });

  const payload = await getJson<{ access_token?: string }>(
    `${META_GRAPH_URL}/oauth/access_token?${params}`,
  );

  return payload?.access_token ?? null;
}

/**
 * Cambia el token corto por uno de larga duración (unos 60 días). Sin este paso
 * la conexión se caería a la hora de haberla creado.
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string,
): Promise<MetaToken | null> {
  const credentials = getMetaCredentials();
  if (!credentials) return null;

  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: credentials.appId,
    client_secret: credentials.appSecret,
    fb_exchange_token: shortLivedToken,
  });

  const payload = await getJson<{ access_token?: string; expires_in?: number }>(
    `${META_GRAPH_URL}/oauth/access_token?${params}`,
  );

  if (!payload?.access_token) return null;

  return {
    accessToken: payload.access_token,
    expiresAt: payload.expires_in
      ? new Date(Date.now() + payload.expires_in * 1000).toISOString()
      : null,
  };
}

/**
 * Cuentas publicitarias que alcanza el acceso concedido.
 *
 * Se buscan por dos vías porque `/me/adaccounts` solo devuelve las cuentas en
 * las que el usuario tiene un rol directo: quien administra sus cuentas desde
 * un Business Manager recibía una lista vacía y un «no tienes cuentas» que no
 * era cierto. Las de los negocios se piden aparte y se unen sin repetir.
 *
 * Un fallo consultando negocios no tumba el resultado: se devuelve lo que sí
 * se pudo leer, que es mejor que no ofrecer ninguna cuenta.
 */
export async function fetchAdAccounts(
  accessToken: string,
): Promise<MetaAdAccount[]> {
  const [direct, fromBusinesses] = await Promise.all([
    fetchDirectAdAccounts(accessToken),
    fetchBusinessAdAccounts(accessToken),
  ]);

  const byId = new Map<string, MetaAdAccount>();
  for (const account of [...direct, ...fromBusinesses]) {
    byId.set(account.id, account);
  }

  return [...byId.values()];
}

/** Cuentas en las que el usuario tiene un rol directo. */
async function fetchDirectAdAccounts(
  accessToken: string,
): Promise<MetaAdAccount[]> {
  const params = new URLSearchParams({
    fields: META_AD_ACCOUNT_FIELDS,
    limit: META_ACCOUNTS_LIMIT,
    access_token: accessToken,
  });

  const payload = await getJsonOrThrow<{ data?: MetaAdAccountRow[] }>(
    `${META_GRAPH_URL}/me/adaccounts?${params}`,
  );

  return (payload.data ?? []).map(toAdAccount);
}

/** Cuentas propias y de clientes de cada Business Manager del usuario. */
async function fetchBusinessAdAccounts(
  accessToken: string,
): Promise<MetaAdAccount[]> {
  const params = new URLSearchParams({
    fields: "id",
    limit: META_ACCOUNTS_LIMIT,
    access_token: accessToken,
  });

  // Sin `business_management` concedido esto falla; se sigue con las directas.
  const businesses = await getJson<{ data?: { id: string }[] }>(
    `${META_GRAPH_URL}/me/businesses?${params}`,
  );

  const requests = (businesses?.data ?? []).flatMap((business) =>
    META_BUSINESS_ACCOUNT_EDGES.map(async (edge) => {
      const edgeParams = new URLSearchParams({
        fields: META_AD_ACCOUNT_FIELDS,
        limit: META_ACCOUNTS_LIMIT,
        access_token: accessToken,
      });

      const payload = await getJson<{ data?: MetaAdAccountRow[] }>(
        `${META_GRAPH_URL}/${business.id}/${edge}?${edgeParams}`,
      );

      return (payload?.data ?? []).map(toAdAccount);
    }),
  );

  return (await Promise.all(requests)).flat();
}

/** Fila de cuenta publicitaria tal como la devuelve la Graph API. */
interface MetaAdAccountRow {
  id: string;
  name?: string;
  account_id: string;
}

function toAdAccount(account: MetaAdAccountRow): MetaAdAccount {
  return {
    id: account.id,
    accountId: account.account_id,
    name: account.name ?? account.id,
  };
}

/**
 * Campañas de la cuenta con sus métricas de toda su vida.
 *
 * Las insights se piden en su propia llamada en vez de anidadas: así
 * `date_preset` viaja como parámetro de primer nivel y cubre el histórico
 * completo. Anidadas, Meta aplicaba su rango por defecto —los últimos 30
 * días— y cualquier campaña terminada antes llegaba con todo a cero.
 *
 * Siguen siendo dos llamadas para la cuenta entera, no una por campaña.
 */
export async function fetchCampaigns(
  accessToken: string,
  adAccountId: string,
): Promise<MetaCampaign[]> {
  const [campaigns, insights] = await Promise.all([
    fetchCampaignList(accessToken, adAccountId),
    fetchCampaignInsights(accessToken, adAccountId),
  ]);

  return campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    objective: campaign.objective ?? null,
    startsAt: campaign.start_time ?? null,
    // Una campaña sin entrega no aparece en insights: se queda a cero.
    ...toCampaignMetrics(insights.get(campaign.id)),
  }));
}

/** Campañas de la cuenta, sin métricas. */
async function fetchCampaignList(accessToken: string, adAccountId: string) {
  const params = new URLSearchParams({
    fields: META_CAMPAIGN_FIELDS,
    limit: "500",
    access_token: accessToken,
  });

  const payload = await getJsonOrThrow<{
    data?: {
      id: string;
      name: string;
      status: string;
      objective?: string;
      start_time?: string;
    }[];
  }>(`${META_GRAPH_URL}/${adAccountId}/campaigns?${params}`);

  return payload?.data ?? [];
}

/** Métricas acumuladas de cada campaña, indexadas por su identificador. */
async function fetchCampaignInsights(
  accessToken: string,
  adAccountId: string,
): Promise<Map<string, MetaInsightsPayload>> {
  const params = new URLSearchParams({
    level: META_INSIGHTS_LEVEL,
    date_preset: META_INSIGHTS_DATE_PRESET,
    fields: META_INSIGHT_FIELDS,
    limit: META_INSIGHTS_LIMIT,
    access_token: accessToken,
  });

  const payload = await getJsonOrThrow<{ data?: MetaInsightsPayload[] }>(
    `${META_GRAPH_URL}/${adAccountId}/insights?${params}`,
  );

  return new Map(
    (payload?.data ?? [])
      .filter((row): row is MetaInsightsPayload & { campaign_id: string } =>
        typeof row.campaign_id === "string",
      )
      .map((row) => [row.campaign_id, row]),
  );
}
