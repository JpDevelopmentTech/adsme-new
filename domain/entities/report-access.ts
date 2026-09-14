/**
 * Resultado de intentar abrir un enlace de reporte. `notFound` cubre también el
 * exceso de intentos: quien prueba códigos no debe poder distinguir los casos.
 */
export type ReportAccessStatus =
  | "ok"
  | "notFound"
  | "expired"
  | "passwordRequired"
  | "passwordInvalid";

export interface ReportAccess {
  status: ReportAccessStatus;
  /** Solo llega con `ok`; en cualquier otro caso el token no se entrega. */
  token: string | null;
}
