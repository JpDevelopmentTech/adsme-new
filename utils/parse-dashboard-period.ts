import {
  DASHBOARD_PERIOD_COPY,
  MAX_DASHBOARD_PERIOD_DAYS,
} from "@/constants/dashboard-period.constants";
import type { ParsedPeriod } from "@/types/period-filter.types";
import { defaultDashboardPeriod } from "@/utils/default-dashboard-period";
import type { RawSearchParams } from "@/utils/parse-client-list-query";
import { parsePeriod } from "@/utils/parse-period";

/** Período del dashboard según la URL: el mes en curso si no llega o no vale. */
export function parseDashboardPeriod(params: RawSearchParams, now: Date): ParsedPeriod {
  return parsePeriod(
    params,
    defaultDashboardPeriod(now),
    { maxDays: MAX_DASHBOARD_PERIOD_DAYS },
    DASHBOARD_PERIOD_COPY.invalidLink,
  );
}
