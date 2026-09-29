/** Lee lo que se va escribiendo en el campo de CPV; acepta coma o punto decimal. */
export function parseCpvInput(value: string): number {
  return Number(value.trim().replace(",", "."));
}
