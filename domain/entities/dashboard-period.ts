/**
 * Lapso que analiza el dashboard, con ambos extremos incluidos y en
 * `YYYY-MM-DD`. Por defecto es el mes en curso; el usuario lo cambia desde el
 * filtro de período y viaja en la URL.
 */
export interface DashboardPeriod {
  from: string;
  to: string;
}
