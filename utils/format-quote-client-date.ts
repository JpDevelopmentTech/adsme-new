import { SHORT_MONTHS } from "@/constants/quote-campaign.constants";

/** Fecha corta de un cliente guardado: «18 oct 2026». Lee la fecha ISO sin zona horaria. */
export function formatQuoteClientDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${SHORT_MONTHS[month - 1] ?? ""} ${year}`;
}
