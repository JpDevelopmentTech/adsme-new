import { NextResponse, type NextRequest } from "next/server";
import { getCronSecret } from "@/infrastructure/cron/cron-env";
import { logger } from "@/infrastructure/logging/logger";
import { runDailySync } from "@/infrastructure/sync/run-daily-sync";
import { isSameSecret } from "@/utils/is-same-secret";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tope de duración en Vercel. Con la última sincronización real, un
 * propietario con 7 cuentas tardó unos 80 s; los propietarios corren en
 * paralelo, así que 300 s deja margen sin pasarse del máximo del plan Hobby
 * (con Fluid Compute).
 */
export const maxDuration = 300;

/**
 * Sincronización programada de las campañas de todos los usuarios, cada 6
 * horas, con cuatro crons diarios de `vercel.json`. La llama Vercel, nunca un
 * usuario: la única credencial es el `CRON_SECRET` que Vercel envía como Bearer.
 *
 * Vercel no garantiza la entrega: puede saltarse una ejecución o lanzarla dos
 * veces. Es inocuo porque la sincronización es idempotente (todo son upserts)
 * y la siguiente recupera lo que faltara.
 *
 * Responde 200 aunque falle alguna cuenta, porque nadie reintenta y el
 * detalle ya queda en el cuerpo y en el registro; 500 solo si no corrió.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = getCronSecret();

  if (!secret) {
    return NextResponse.json(
      { error: "El cron no está configurado." },
      { status: 503 },
    );
  }

  const provided = request.headers.get("authorization") ?? "";

  if (!isSameSecret(provided, `Bearer ${secret}`)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    return NextResponse.json(await runDailySync());
  } catch (error) {
    logger.error("cron.sync_failed", {
      reason: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: "No se pudo ejecutar la sincronización." },
      { status: 500 },
    );
  }
}
