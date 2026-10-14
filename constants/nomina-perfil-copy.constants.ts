import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";
import type { ProfileTab } from "@/types/nomina-perfil.types";

/** Pestañas del perfil en su orden, con la etiqueta literal del diseño. */
export const PROFILE_TABS: { value: ProfileTab; label: string }[] = [
  { value: "finanzas", label: "Finanzas" },
  { value: "historico", label: "Histórico" },
  { value: "ads", label: "Ads" },
  { value: "optimizacion", label: "Optimización" },
  { value: "legal", label: "Legal" },
];

export const DEFAULT_PROFILE_TAB: ProfileTab = "finanzas";

/** Etiqueta de cada concepto de ingreso en las tablas del perfil. */
export const MOVEMENT_CONCEPT_LABELS: Record<NominaIncomeConcept, string> = {
  show: "Show",
  inversion: "Inversión Única",
  express: "Express",
  otro: "Otro",
};

/** Textos de la cabecera, los KPIs y la fila de pestañas. */
export const PROFILE_COPY = {
  backLabel: "Artistas",
  tabsLabel: "Secciones del perfil",
  changePhoto: "Cambiar foto",
  nominaLead: "Nómina",
  joinedLead: "En el roster desde",
  monthIncome: "Ingresos Brutos (mes)",
  status: "Estado",
  profitHelp: "Rentabilidad neta acumulada",
  profitTooltip: "Rentabilidad neta acumulada = utilidad neta ÷ ingresos propios. Estándar saludable: 10% o más.",
  noIncome: "Sin ingresos aún",
  scalability: "Escalabilidad",
  availableBudget: "Presupuesto Disponible",
  profit: "Utilidad",
  goalTooltip: "Utilidad fija del mes: la Utilidad generada (antes de impuestos) frente a la meta de rentabilidad de este artista.",
  goalReached: "Rentable ✓",
  adsSpent: "Inversión (Ads)",
  service: "Servicio",
  serviceAssumed: "Asumido por AdsME",
  taxes: "Impuestos",
  monthButtonLabel: "Mes que se está viendo",
  bannerLead: "Estás viendo",
  bannerTail: "— un mes histórico. Los registros nuevos están deshabilitados aquí.",
  bannerBack: "Volver al mes actual",
} as const;

/** Textos de la pestaña Finanzas. */
export const FINANCE_TAB_COPY = {
  movementsTitle: "Desglose de Movimientos",
  movementsSubtitle: "Cada ingreso con su reparto. Arrastra el asa para reordenar (o usa ↑ ↓).",
  movementsSubtitleReadOnly: "Cada ingreso con su reparto.",
  expandAll: "Ver el detalle económico de todos",
  collapseAll: "Ocultar el detalle económico de todos",
  expandRow: "Ver detalle económico",
  collapseRow: "Ocultar detalle económico",
  columns: { concept: "Concepto", amount: "Monto", eventDate: "Fecha de Evento", incomeDate: "Fecha de Ingreso", assignedMonth: "Mes Asignado", actions: "Acciones" },
  detailTitle: "Detalle económico",
  detailAmount: "Monto de la transacción",
  ofAmount: "del monto",
  detailLabels: { service: "Servicio", profit: "Utilidad", taxes: "Impuestos 30%", netProfit: "Utilidad neta", investment: "Inversión" },
  totalLabels: {
    amount: { short: "Monto", full: "Monto" },
    service: { short: "Serv.", full: "Servicio" },
    profit: { short: "Util.", full: "Utilidad" },
    taxes: { short: "Imp.", full: "Impuestos" },
    investment: { short: "Inv.", full: "Inversión" },
  },
  description: "Descripción",
  document: "Documento",
  total: "Total",
  movementsWord: "movimientos",
  emptyTitle: "Sin movimientos todavía",
  emptyDescription: "Registra el primer ingreso con el botón “Nuevo Ingreso”.",
  emptyDescriptionReadOnly: "Aún no hay ingresos registrados en tu perfil.",
  expensesTitle: "Gastos",
  expensesSubtitle: "Pagos de Servicio y proveedores de",
  expenseColumns: { concept: "Concepto", amount: "Monto", target: "Se descuenta de", date: "Fecha", month: "Mes asignado", actions: "Acciones" },
  targetAds: "Presupuesto de Ads",
  targetService: "Servicio",
  totalAds: "Total de Ads:",
  totalService: "Total de Servicio:",
  distributionTitle: "Distribución del mes",
  chartTypeLabel: "Tipo de gráfica",
  chartViews: { donut: "Dona", vertical: "Barras verticales", horizontal: "Barras horizontales" },
  noData: "Sin datos",
  performanceTitle: "Rendimiento en el tiempo",
  performanceSubtitle: "por mes calendario",
  performanceLead: "Ingresos diarios de",
} as const;
