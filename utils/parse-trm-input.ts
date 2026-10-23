/**
 * Formas de escribir la TRM que se aceptan. El punto seguido de tres cifras se
 * lee como separador de miles («4.000» son cuatro mil), que es como se escribe
 * en Colombia; con una o dos cifras detrás es decimal («4150.25»).
 */
const TRM_PATTERNS: readonly { pattern: RegExp; normalize: (value: string) => string }[] = [
  // 4.150,25 · 4.000
  {
    pattern: /^\d{1,3}(\.\d{3})+(,\d{1,2})?$/,
    normalize: (value) => value.replace(/\./g, "").replace(",", "."),
  },
  // 4150,25
  { pattern: /^\d+(,\d{1,2})?$/, normalize: (value) => value.replace(",", ".") },
  // 4150.25
  { pattern: /^\d+\.\d{1,2}$/, normalize: (value) => value },
];

/**
 * Lee la TRM escrita en el campo. Devuelve `null` si no tiene una forma
 * reconocible («4,150.25», «4.150.25», texto); el rango lo valida quien llama.
 */
export function parseTrmInput(value: string): number | null {
  const trimmed = value.trim();
  const match = TRM_PATTERNS.find(({ pattern }) => pattern.test(trimmed));

  return match ? Number(match.normalize(trimmed)) : null;
}
