/**
 * Importe escrito con separadores de miles, de vuelta a número. El campo se
 * edita como texto para poder formatearlo mientras se escribe, así que todo lo
 * que no sea dígito sobra.
 */
export function parseThousands(value: string): number {
  const digits = value.replace(/\D/g, "");

  return digits ? Number(digits) : 0;
}
