import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { GOOGLE_ADS_INGEST_HEADER } from "@/constants/google-ads.constants";
import { getGoogleAdsIngestSecret } from "@/infrastructure/google/google-ads-env";
import { saveGoogleAdsExport } from "@/infrastructure/google/google-ads-staging-writer";
import { createServiceSupabaseClient } from "@/infrastructure/supabase/service-supabase-client";
import { googleAdsIngestSchema } from "@/validators/google-ads-ingest.validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recibe lo que exporta el script programado dentro de Google Ads y lo deja en
 * el buzón común. Quien llama no es un usuario con sesión, sino Google, así que
 * la única credencial es el secreto compartido de la cabecera.
 *
 * Responde con el recuento de filas escritas para que el script pueda registrar
 * en su log si el lote entró completo.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = getGoogleAdsIngestSecret();

  if (!secret) {
    return NextResponse.json(
      { error: "La ingesta de Google Ads no está configurada." },
      { status: 503 },
    );
  }

  const provided = request.headers.get(GOOGLE_ADS_INGEST_HEADER);

  if (!provided || !isSameSecret(provided, secret)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = googleAdsIngestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Los datos enviados no son válidos.",
        detalles: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    );
  }

  try {
    const written = await saveGoogleAdsExport(
      createServiceSupabaseClient(),
      parsed.data,
    );

    return NextResponse.json({ ok: true, ...written });
  } catch {
    // El motivo queda en los logs de Supabase; al script solo le sirve saber
    // que debe reintentar el lote.
    return NextResponse.json(
      { error: "No se pudieron guardar los datos." },
      { status: 500 },
    );
  }
}

/**
 * Compara el secreto en tiempo constante. Con `===` el tiempo de respuesta
 * variaría según cuántos caracteres coinciden, que es suficiente para adivinarlo
 * a fuerza de intentos.
 */
function isSameSecret(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
