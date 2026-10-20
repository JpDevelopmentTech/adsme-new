import { z } from "zod";

/**
 * Código de moneda ISO 4217 tal como lo devuelven las plataformas (`USD`,
 * `COP`). Se normaliza a mayúsculas porque es lo que exige la restricción de
 * `campaigns.currency` en la base de datos.
 */
export const currencyCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/, { message: "La moneda debe ser un código ISO de 3 letras." });
