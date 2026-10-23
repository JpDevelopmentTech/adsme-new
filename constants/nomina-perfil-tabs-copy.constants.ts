/** Textos de la pestaña Histórico del perfil. */
export const HISTORY_TAB_COPY = {
  titleLead: "Histórico de",
  available: "Disponible para Ads",
  availableNote: "No depende del periodo elegido",
  raising: "Recaudando este mes",
  raisingNote: "Inversión de Shows de",
  raised: "Recaudado ·",
  raisedMonths: "meses",
  raisedNote: "Inversión + Inversión Express del rango",
  mapTitle: "Mapa de meses",
  mapSubtitle:
    "Cada barra es un mes (por Mes Asignado), llena con el reparto de sus ingresos. La parte morada oscura es el presupuesto que deja para el mes siguiente; la clara (Express) se gasta en el mes en que ingresa.",
  mapLabel: "Reparto de los ingresos de cada mes",
  mapEmptyTitle: "Aún no hay meses con ingresos",
  mapEmptyDescription: "Cuando registres ingresos, cada mes aparece aquí con su reparto y el presupuesto que deja.",
  showsLegend: "Inversión de Shows (presupuesto del mes siguiente)",
  expressLegend: "Inversión Express (se gasta al ingresar)",
  current: "en curso",
  tooltipIncome: "Ingresos",
  tooltipTaxes: "Impuestos (30%)",
  tooltipShows: "Inversión Shows",
  tooltipBudget: "Presupuesto para",
  budgetTitle: "Presupuesto mes a mes",
  budgetSubtitle: "Lo que cada mes recibió del anterior y lo que deja para ejecutar en el siguiente.",
  budgetColumns: ["Mes", "Ingresos", "Shows", "Servicio", "Utilidad", "Impuestos", "Presupuesto recibido", "Presupuesto que deja"],
} as const;

/** Textos de la pestaña Ads (maqueta: la lista de campañas está vacía). */
export const ADS_TAB_COPY = {
  raised: "Presupuesto recaudado",
  raisedNote: "Inversión acumulada de todos los meses",
  spent: "Presupuesto Gastado",
  spentNote: "Gastos con destino Ads y campañas de AdsME",
  spentDetail: (expenses: string, campaigns: string) => `Gastos de Ads ${expenses} · Campañas ${campaigns}`,
  left: "Presupuesto Restante",
  leftNote: "Recaudado − Gastado = Presupuesto Disponible",
  campaignsTitle: "Campañas de AdsME",
  campaignsSubtitle: "Gasto desde su inicio en Nómina: se descuenta del presupuesto de Ads",
  emptyTitle: "Sin campañas con gasto",
  emptyDescription: "Cuando un trabajo de este artista tenga campañas con gasto desde su inicio en Nómina, aparecerán aquí.",
  openJob: (title: string) => `Abrir el trabajo ${title}`,
  converted: (original: string, rate: string) => `${original} × TRM ${rate}`,
  notConverted: "Sin TRM: no se descuenta",
  unconverted: (amount: string, jobs: string) =>
    `${amount} en cuentas en dólares no se descuentan porque su trabajo no tiene TRM (${jobs}). Agrégala en el paso 3 del trabajo.`,
} as const;

/** Textos de Optimización y Legal (maquetas: siempre vacías). */
export const OPTIMIZATION_LEGAL_COPY = {
  piecesTitle: "Piezas de Contenido",
  piecesSubtitle: "Registro para potenciar alcance y algoritmo del artista",
  piecesEmptyTitle: "Sin piezas de contenido",
  piecesEmptyDescription: "Aún no hay piezas registradas para este artista.",
  ipTitle: "Propiedad Intelectual",
  ipDescription: "Sin contratos ni registros DNDA cargados todavía.",
  compositionTitle: "Composición & Master",
  compositionDescription: "Sin obras registradas todavía.",
  worksTitle: "Obras Registradas",
  worksEmptyTitle: "Sin obras registradas",
  worksEmptyDescription: "Las obras y su estatus DNDA aparecerán aquí.",
} as const;

/** Artista inexistente en el panel. */
export const PROFILE_NOT_FOUND_COPY = {
  back: "Volver a Artistas",
  title: "Artista no encontrado",
} as const;
