/**
 * Compara el gasto planificado con el calendario del mes y lo dice en palabras.
 * Un punto es un punto porcentual de diferencia entre ambos ritmos.
 */
export function formatPacing(
  spendPercent: number,
  calendarPercent: number,
): string {
  const points = Math.round(spendPercent - calendarPercent);
  const unit = Math.abs(points) === 1 ? "pt" : "pts";

  if (points >= 1) return `${points} ${unit} sobre el ritmo`;
  if (points <= -1) return `${Math.abs(points)} ${unit} bajo el ritmo`;

  return "al ritmo del mes";
}
