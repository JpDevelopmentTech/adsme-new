import "server-only";

import { EMPTY_REPORT_SPEND } from "@/constants/report-spend.constants";
import type { ReportSpend } from "@/domain/entities/report-spend";
import { logger } from "@/infrastructure/logging/logger";
import { convertSpend } from "@/utils/convert-spend";
import { mergeReportSpend } from "@/utils/merge-report-spend";
import {
  spendByCurrencySchema,
  spendByJobSchema,
  usdCopRateSchema,
} from "@/validators/report-spend.validators";

/**
 * Gasto de una fila del reporte (`spend_by_currency` + `usd_cop_rate` del
 * trabajo), ya convertido con la TRM de ese trabajo.
 *
 * Si la base devuelve algo inesperado se registra y se toma como vacío: el
 * reporte lo abre un cliente, y una cifra de menos es preferible a una página
 * rota.
 */
export function toReportSpend(
  spendByCurrency: unknown,
  usdCopRate: unknown,
): ReportSpend {
  const spend = spendByCurrencySchema.safeParse(spendByCurrency);
  const rate = usdCopRateSchema.safeParse(usdCopRate);

  if (!spend.success || !rate.success) {
    logger.error("report.spend_parse_failed", { spendByCurrency, usdCopRate });
    return EMPTY_REPORT_SPEND;
  }

  return convertSpend(spend.data, rate.data);
}

/**
 * Gasto de una plataforma en el reporte del artista, que junta lanzamientos:
 * cada uno se convierte con su propia TRM antes de sumarse.
 */
export function toLaunchesReportSpend(spendByJob: unknown): ReportSpend {
  const launches = spendByJobSchema.safeParse(spendByJob);

  if (!launches.success) {
    logger.error("report.spend_by_job_parse_failed", { spendByJob });
    return EMPTY_REPORT_SPEND;
  }

  return mergeReportSpend(
    launches.data.map((launch) =>
      convertSpend(launch.spend_by_currency, launch.usd_cop_rate),
    ),
  );
}
