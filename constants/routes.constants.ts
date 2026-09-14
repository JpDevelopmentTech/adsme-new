import { GOOGLE_ADS_INGEST_PATH } from "@/constants/google-ads.constants";
import { REPORT_ROUTE_PREFIX } from "@/constants/report-link.constants";

export const LOGIN_ROUTE = "/login";

/** Pantalla A2 del diseño, todavía sin implementar. */
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";

export const AUTH_CALLBACK_ROUTE = "/auth/callback";

export const DASHBOARD_ROUTE = "/dashboard";

export const CLIENTS_ROUTE = "/clientes";

export const JOBS_ROUTE = "/trabajos";

export const CONNECTIONS_ROUTE = "/conexiones";

export const CAMPAIGNS_ROUTE = "/campanas";

/** Pantalla `B8` de vinculación de campañas con un trabajo. */
export const LINK_CAMPAIGN_ROUTE = `${CAMPAIGNS_ROUTE}/vincular`;

/** Paso 2 del asistente: campañas por plataforma de un trabajo. */
export function jobCampaignsRoute(jobId: string): string {
  return `${JOBS_ROUTE}/${jobId}/campanas`;
}

/** Paso 3 del asistente: qué secciones ve el cliente en su reporte. */
export function jobReportRoute(jobId: string): string {
  return `${JOBS_ROUTE}/${jobId}/reporte`;
}

/** Paso 4 del asistente: enlace que se comparte con el cliente. */
export function jobLinkRoute(jobId: string): string {
  return `${JOBS_ROUTE}/${jobId}/enlace`;
}

/** Paso 1 del asistente de creación de trabajos (`B6`). */
export const NEW_JOB_ROUTE = `${JOBS_ROUTE}/nuevo`;

/** Ruta del detalle de un trabajo (pantalla `B7`). */
export function jobDetailRoute(jobId: string): string {
  return `${JOBS_ROUTE}/${jobId}`;
}

/** Ruta de edición de un trabajo concreto. */
export function editJobRoute(jobId: string): string {
  return `${JOBS_ROUTE}/${jobId}/editar`;
}

export const NEW_CLIENT_ROUTE = `${CLIENTS_ROUTE}/nuevo`;

/** Ruta del detalle de un cliente concreto (pantalla `B3` del diseño). */
export function clientDetailRoute(clientId: string): string {
  return `${CLIENTS_ROUTE}/${clientId}`;
}

/** Ruta de edición de un cliente concreto. */
export function editClientRoute(clientId: string): string {
  return `${CLIENTS_ROUTE}/${clientId}/editar`;
}

/** Destino al que se envía al usuario tras autenticarse correctamente. */
export const POST_LOGIN_ROUTE = DASHBOARD_ROUTE;

/** Rutas accesibles sin sesión activa. */
export const PUBLIC_ROUTE_PREFIXES = [
  REPORT_ROUTE_PREFIX,
  LOGIN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  "/auth",
  // Quien llama es Google, no un navegador con sesión: si el proxy lo mandara
  // al login, el script recibiría una redirección y los datos no entrarían
  // nunca. El propio endpoint valida el secreto compartido de la cabecera.
  GOOGLE_ADS_INGEST_PATH,
] as const;
