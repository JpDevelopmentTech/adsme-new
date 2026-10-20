import { timingSafeEqual } from "node:crypto";

/**
 * Compara un secreto en tiempo constante. Con `===` el tiempo de respuesta
 * variaría según cuántos caracteres coinciden, que es suficiente para adivinarlo
 * a fuerza de intentos.
 */
export function isSameSecret(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
