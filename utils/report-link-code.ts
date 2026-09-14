/**
 * Código corto del enlace de reporte (`…/r/x8Kd2` → `x8Kd2`). En la tabla es lo
 * único que distingue una fila de otra: el dominio se repite en todas y no
 * aporta nada.
 */
export function reportLinkCode(reportUrl: string): string {
  return reportUrl.split("/").filter(Boolean).at(-1) ?? "";
}
