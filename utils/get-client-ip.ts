/**
 * IP del visitante según las cabeceras del proxy. `x-forwarded-for` puede traer
 * una cadena de saltos; el primero es el cliente original.
 */
export function getClientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded) return forwarded.split(",")[0].trim();

  return headerList.get("x-real-ip") ?? "unknown";
}
