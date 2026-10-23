import { z } from "zod";

/**
 * Reparto por moneda tal como lo devuelven las funciones del reporte en jsonb:
 * `{"COP": 1996923, "USD": 876}`. Dentro de jsonb los números llegan como
 * números de JavaScript.
 */
export const spendByCurrencySchema = z.record(
  z.string().regex(/^[A-Z]{3}$/),
  z.number().finite(),
);

/**
 * TRM del trabajo. Como columna `numeric` PostgREST la entrega como número o
 * como texto según su tamaño; `null` significa que el trabajo no convierte. No
 * se usa `z.coerce`, que convertiría `null` en 0.
 */
export const usdCopRateSchema = z
  .union([z.number(), z.string()])
  .nullable()
  .transform((value) => (value === null ? null : Number(value)))
  .refine((value) => value === null || (Number.isFinite(value) && value > 0));

/** Gasto de una plataforma separado por lanzamiento, cada uno con su TRM. */
export const spendByJobSchema = z.array(
  z.object({
    usd_cop_rate: usdCopRateSchema,
    spend_by_currency: spendByCurrencySchema,
  }),
);
