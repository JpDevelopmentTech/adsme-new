import type { QuoteSavedClient } from "@/domain/entities/quote-catalog";

/** Clientes guardados de muestra (datos de ejemplo, no reales). */
export const SAMPLE_SAVED_CLIENTS: QuoteSavedClient[] = [
  { slug: "valeria-gomez", name: "Valeria Gómez", updatedAt: "2026-10-18", total: "$14.800.000", currency: "COP", count: 3 },
  { slug: "los-kalibre", name: "Los Kalibre", updatedAt: "2026-10-09", total: "$9.600.000", currency: "COP", count: 1 },
  { slug: "isla-norte", name: "Isla Norte", updatedAt: "2026-09-27", total: "US$2,400.00", currency: "USD", count: 2 },
];
