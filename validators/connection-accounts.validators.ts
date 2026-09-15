import { z } from "zod";

/**
 * Cuentas marcadas en el selector. Llegan como una entrada por casilla, así que
 * se valida la lista entera: sin ninguna no habría de dónde importar, y para
 * eso está Desconectar.
 */
export const accountIdsSchema = z
  .array(z.string().trim().min(1).max(64))
  .nonempty();
