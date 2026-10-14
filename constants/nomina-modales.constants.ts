import type { NominaExpenseTarget, NominaExpenseType } from "@/domain/entities/nomina-expense";
import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";
import type { NominaChoice, NominaServicePayer, NominaSplitSettings } from "@/types/nomina-modales.types";

/** Nómina mínima con la que el modelo es viable. */
export const MIN_VIABLE_NOMINA = 200_000;

/** Tramos de nómina con su umbral base para sugerir el Mínimo de Shows. */
export const NOMINA_TIERS = [
  { from: 300_000, threshold: 2_100_000 },
  { from: 250_000, threshold: 2_000_000 },
  { from: 200_000, threshold: 1_800_000 },
] as const;

/** Fracción del punto de equilibrio que se sugiere como Servicio. */
export const SUGGESTED_SERVICE_RATIO = 2 / 7;

/** Shows que se simulan como tope para metas que no llegan en un mes. */
export const MAX_SIMULATED_SHOWS = 60;

/** Shows de más que se pintan en la regla después del mínimo. */
export const RULER_EXTRA_SHOWS = 3;

/** Reparto de una Inversión Única: comisión de gestión sobre el capital. */
export const SINGLE_INVESTMENT_PROFIT_RATE = 0.1;

/** Modelo con el que arranca un artista nuevo. */
export const DEFAULT_SPLIT_SETTINGS: NominaSplitSettings = {
  hasService: true,
  service: null,
  servicePayer: "cliente",
  hasScalability: true,
  profitPercent: 20,
  profitPerShowAfterMin: 100_000,
  hasFixedProfit: false,
  fixedProfit: 0,
};

export const SERVICE_PAYER_OPTIONS: NominaChoice<NominaServicePayer>[] = [
  { value: "cliente", label: "El cliente" },
  { value: "adsme", label: "AdsME" },
];

/** Montos base de Express: valor del `select` → monto y nómina que precarga. */
export const EXPRESS_PRESETS = [
  { value: "1800000", label: "Base Nómina $200k — $1.800.000", amount: 1_800_000, nomina: 200_000 },
  { value: "2000000", label: "Base Nómina $250k — $2.000.000", amount: 2_000_000, nomina: 250_000 },
  { value: "2100000", label: "Base Nómina $300k — $2.100.000", amount: 2_100_000, nomina: 300_000 },
] as const;

/** Valor del `select` de Express para escribir un monto propio. */
export const EXPRESS_OTHER = "otro";

export const INCOME_CONCEPT_OPTIONS: NominaChoice<NominaIncomeConcept>[] = [
  { value: "show", label: "Show" },
  { value: "inversion", label: "Inversión Única" },
  { value: "express", label: "Express" },
  { value: "otro", label: "Otro" },
];

export const EXPENSE_TYPE_OPTIONS: NominaChoice<NominaExpenseType>[] = [
  { value: "servicio", label: "Pago de Servicio" },
  { value: "spotify", label: "Spotify Playlist" },
  { value: "otro", label: "Otro proveedor" },
];

/** Concepto y destino que fija cada tipo de gasto al elegirlo. */
export const EXPENSE_TYPE_DEFAULTS: Record<NominaExpenseType, { concept: string; target: NominaExpenseTarget }> = {
  servicio: { concept: "Pago de Servicio", target: "servicio" },
  spotify: { concept: "Spotify Playlist", target: "ads" },
  otro: { concept: "", target: "ads" },
};

export const EXPENSE_TARGET_OPTIONS: NominaChoice<NominaExpenseTarget>[] = [
  { value: "ads", label: "Presupuesto de Ads" },
  { value: "servicio", label: "Servicio" },
];

/** Bolsas ajustables de la distribución: campo del reparto → bolsa de color. */
export const EDITABLE_BUCKETS = [
  { key: "investment", bucket: "inversion" },
  { key: "service", bucket: "servicio" },
  { key: "profit", bucket: "utilidad" },
] as const;

/** Nómina con la que se reparte el Express del alta mientras no haya una válida. */
export const EXPRESS_REFERENCE_NOMINA = 300_000;
