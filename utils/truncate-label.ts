/** Corta un rótulo largo con «…» para que quepa bajo una barra. */
export function truncateLabel(label: string, max: number): string {
  return label.length > max ? `${label.slice(0, max).trimEnd()}…` : label;
}
