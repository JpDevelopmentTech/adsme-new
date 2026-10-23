/** Quita tildes y pasa a minúsculas para buscar «Medellín» escribiendo «medellin». */
export function foldSearchText(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}
