/**
 * Mes asignado tras cambiar una fecha: se conserva si su año sigue entre los
 * de las dos fechas; si no, salta al mes de la Fecha de Evento.
 */
export function keepAssignedMonth(assignedMonth: string, eventDate: string, incomeDate: string): string {
  const years = [eventDate.slice(0, 4), incomeDate.slice(0, 4)];
  return years.includes(assignedMonth.slice(0, 4)) ? assignedMonth : eventDate.slice(0, 7);
}
