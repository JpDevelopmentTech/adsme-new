import type { HighlightPart } from "@/types/global-search.types";

/** Quita tildes y pasa a minúsculas para comparar «Medellín» con «medellin». */
function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

/**
 * Parte un texto en trozos marcando la primera coincidencia con el término, sin
 * distinguir mayúsculas ni tildes. Las posiciones se calculan sobre el texto
 * plegado, que conserva la longitud carácter a carácter de los latinos.
 */
export function splitHighlight(text: string, term: string): HighlightPart[] {
  const needle = fold(term.trim());
  const index = needle ? fold(text).indexOf(needle) : -1;

  if (index === -1) return [{ text, isMatch: false }];

  return [
    { text: text.slice(0, index), isMatch: false },
    { text: text.slice(index, index + needle.length), isMatch: true },
    { text: text.slice(index + needle.length), isMatch: false },
  ].filter((part) => part.text.length > 0);
}
