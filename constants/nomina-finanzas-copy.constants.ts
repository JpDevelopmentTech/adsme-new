/** Textos literales de la pantalla Finanzas de la Nómina Plan. */
export const FINANCE_COPY = {
  title: "Finanzas",
  subtitleLead: "Contabilidad, flujo de caja, rentabilidad y tributario",
  tabsLabel: "Secciones de Finanzas",
  comparison: "vs. periodo anterior",
  comparisonMonth: "vs. mes anterior",
} as const;

/** Estados vacíos de cada pestaña cuando el periodo no tiene movimientos. */
export const FINANCE_EMPTY_COPY = {
  noIncome: "Sin ingresos en este periodo",
  evolution: "Cambia el periodo o registra ingresos para ver la evolución.",
  noFlow: "Sin flujo en este periodo",
  flow: "Cuando haya ingresos en el periodo elegido, el flujo aparece aquí.",
  profit: "Cambia el periodo para ver qué tan rentable es cada artista.",
  noTaxes: "Sin impuestos causados en este periodo",
  health: "Cuando haya ingresos, aquí verás si el negocio es rentable.",
} as const;

/** Resumen: salud del negocio, KPIs, indicadores, evolución y estado de resultados. */
export const FINANCE_SUMMARY_COPY = {
  healthTitle: "¿Es rentable el negocio?",
  healthSubtitle: "Rentabilidad neta del periodo frente al estándar de negocios.",
  healthLabel: "Rentabilidad neta",
  grossShare: "Sobre ingresos brutos",
  profitableArtists: "Artistas rentables",
  thresholds: [
    { lead: "Menos de 5%", text: "bajo: poco margen de error", level: "ajustado" },
    { lead: "10% o más", text: "saludable: el estándar general", level: "rentable" },
    { lead: "20% o más", text: "excelente", level: "muyRentable" },
  ],
  healthNote:
    "Rentabilidad neta = Utilidad neta ÷ Ingresos propios (Servicio + Utilidad), después de costos de servicio e impuestos. La Inversión no se cuenta como ingreso porque es presupuesto de Ads del artista que pasa de largo.",
  indicatorsTitle: "Indicadores clave",
  indicatorsSubtitle: "Qué tan sano es el negocio en el periodo elegido.",
  evolutionTitle: "Evolución mensual",
  evolutionSubtitle: "Cada barra es un mes y se llena con el reparto de sus ingresos. La línea es el margen neto.",
  evolutionMargin: "Margen neto (eje derecho)",
  statementTitle: "Estado de resultados",
  statementSubtitle: "Mes a mes: de los ingresos brutos a la utilidad neta.",
  statementConcept: "Concepto",
  statementTotal: "Total",
} as const;

/** Flujo de caja: Sankey y reparto por cada $100. */
export const FINANCE_FLOW_COPY = {
  title: "Flujo de caja",
  subtitleLead: "De dónde viene cada peso y hacia dónde va",
  modeLabel: "Agrupar orígenes",
  byConcept: "Por concepto",
  byArtist: "Por artista",
  hint: "Pasa el mouse sobre un flujo para ver cuánto dinero va de un lado a otro.",
  ofIncome: "de los ingresos",
  chartLabel: "Diagrama de flujo de caja del periodo",
  perHundredTitle: "Por cada $100 que entran",
  perHundredSubtitle: "Así se reparte cada ingreso en el periodo.",
  perHundredBar: "Reparto de cada $100 de ingresos",
} as const;

/** Rentabilidad por artista. */
export const FINANCE_PROFIT_COPY = {
  profitableLabel: "Artistas rentables (≥10%)",
  profitableSub: "Rentabilidad neta sobre ingresos propios",
  topNetLabel: "Mayor utilidad neta",
  bestMarginLabel: "Mejor margen neto",
  concentrationLabel: "Concentración del artista principal",
  concentrationHigh: "Alta: el ingreso depende de uno solo",
  concentrationSpread: "Ingresos repartidos",
  tableTitle: "Rentabilidad por artista",
  tableSubtitle: "Ordenado por utilidad neta en el periodo.",
  columns: ["Artista", "Ingresos", "Shows", "Servicio", "Utilidad", "Impuestos", "Utilidad neta", "Inversión", "Rentabilidad neta", "Veredicto", "Neta por show", "Meta utilidad fija"],
  goalReached: "Rentable ✓",
  splitTitle: "Cómo se reparte cada artista",
  splitSubtitle: "Los 10 artistas con más ingresos en el periodo.",
  timelineTitle: "Utilidad neta por artista en el tiempo",
  timelineSubtitle: "Quién genera la utilidad cada mes.",
  others: "Otros",
} as const;

/** Tributario: impuestos del periodo. */
export const FINANCE_TAX_COPY = {
  caused: "Impuestos causados",
  base: "Base gravable (utilidad)",
  rate: "Tasa efectiva",
  causedIn: (month: string) => `Causado en ${month}`,
  chartTitle: "Impuestos en el tiempo",
  chartSubtitle: "Causado cada mes y acumulado del periodo.",
  monthSeries: "Impuestos del mes",
  cumulativeSeries: "Acumulado (eje derecho)",
  monthlyTitle: "Detalle tributario mensual",
  monthlySubtitle: "Base gravable = Utilidad bruta. Impuesto = 30% de la Utilidad.",
  monthlyColumns: ["Mes", "Base gravable", "Tasa", "Impuesto", "Utilidad neta", "Impuesto acumulado"],
  artistTitle: "Impuestos por artista",
  artistSubtitle: "Quién genera la base gravable en el periodo.",
  artistColumns: ["Artista", "Base gravable", "Impuesto", "% del total"],
  artistEmpty: "Sin base gravable en este periodo",
  disclaimer:
    "Cálculo informativo según las reglas del modelo (30% sobre la Utilidad). No reemplaza la liquidación ni la asesoría de un contador.",
} as const;

/** Libro de movimientos. */
export const FINANCE_LEDGER_COPY = {
  title: "Libro de movimientos",
  count: (count: number) => `${count} ${count === 1 ? "movimiento" : "movimientos"}`,
  allArtists: "Todos los artistas",
  filterLabel: "Artista",
  export: "Exportar CSV",
  columns: ["Fecha ingreso", "Mes asignado", "Artista", "Concepto", "Monto", "Servicio", "Utilidad", "Impuestos", "Utilidad neta", "Inversión"],
  csvColumns: ["Fecha ingreso", "Fecha evento", "Mes asignado", "Artista", "Concepto", "Monto", "Servicio", "Utilidad", "Impuestos", "Utilidad neta", "Inversión"],
  more: (count: number) => `··· ${count} ${count === 1 ? "movimiento más" : "movimientos más"} en el periodo`,
  capped: "Mostrando los 300 más recientes. El CSV incluye todos.",
  total: "Total",
  empty: "Sin movimientos en este periodo",
  fileName: "libro-contable",
} as const;
