const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Comprueba que el valor tenga forma de UUID antes de usarlo como clave en Postgres. */
export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}
