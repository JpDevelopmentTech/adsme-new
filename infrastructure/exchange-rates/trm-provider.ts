import "server-only";

import {
  TRM_API_URL,
  TRM_CURRENCY,
  TRM_SOURCE,
  TRM_TIMEOUT_MS,
} from "@/constants/exchange-rate.constants";
import type { ExchangeRate } from "@/domain/entities/exchange-rate";
import type { ExchangeRateProvider } from "@/domain/interfaces/exchange-rate-provider";
import { trmResponseSchema } from "@/validators/trm.validators";

/**
 * TRM oficial desde los datos abiertos de la Superintendencia Financiera.
 *
 * Pide la última tasa cuya vigencia empezó como tarde el día consultado: es la
 * que rige ese día, también en fin de semana o festivo, cuando sigue valiendo
 * la del último día hábil. Filtrar por `vigenciadesde` evita además coger la
 * de mañana, que se publica la tarde anterior.
 */
export function createTrmProvider(): ExchangeRateProvider {
  return {
    async fetchRate(date: string): Promise<ExchangeRate> {
      const params = new URLSearchParams({
        $where: `vigenciadesde <= '${date}T00:00:00.000'`,
        $order: "vigenciadesde DESC",
        $limit: "1",
      });

      const response = await fetch(`${TRM_API_URL}?${params}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(TRM_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`datos.gov.co respondió ${response.status}`);
      }

      const rows = trmResponseSchema.parse(await response.json());
      const row = rows[0];

      if (!row) throw new Error(`no hay TRM publicada para ${date}`);

      return {
        currency: TRM_CURRENCY,
        validFrom: row.vigenciadesde.slice(0, 10),
        rate: row.valor,
        source: TRM_SOURCE,
      };
    },
  };
}
