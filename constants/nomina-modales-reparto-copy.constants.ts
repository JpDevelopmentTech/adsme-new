/** Textos del bloque «Modelo de reparto» (interruptores y campos). */
export const SPLIT_MODEL_COPY = {
  title: "Modelo de reparto",
  serviceQuestion: "¿Aplica Servicio?",
  serviceOn: "Sí, aplica Servicio",
  serviceOff: "No aplica (Servicio $0)",
  serviceAmount: "¿Cuánto es el Servicio?",
  serviceAmountExtra: "— lo primero que se factura cada mes lo cubre",
  servicePlaceholder: "Ej. $600.000",
  serviceSuggested: "Sugerido: 2/7 del punto de equilibrio. Puedes cambiarlo.",
  payerQuestion: "¿Quién asume el costo del Servicio?",
  payerHelp: {
    cliente: "El Servicio sale primero del dinero que factura el cliente cada mes.",
    adsme:
      "AdsME paga el Servicio: no sale del dinero del cliente. La Utilidad se usa primero para cubrirlo y, cuando se completa el monto, empieza a ganar AdsME.",
  },
  scalabilityQuestion: "¿Aplica Escalabilidad?",
  scalabilityOn: "Sí, la ganancia cambia al llegar al Mínimo de Shows",
  scalabilityOff: "No aplica (el % de Utilidad no cambia nunca)",
  percentUntilMin: "% de Utilidad hasta el mínimo",
  percentPlain: "% de Utilidad",
  percentHelp: "Todo el dinero va a Inversión menos este %",
  postLabel: "Utilidad por show después del mínimo",
  postHelp: "El resto de cada show va a Inversión",
  fixedQuestion: "¿Aplica Utilidad Fija?",
  fixedOn: "Sí, meta de Utilidad para medir rentabilidad",
  fixedOff: "No aplica",
  fixedAmount: "Monto de la Utilidad fija",
  fixedAmountExtra: "— solo una métrica: no cambia el reparto",
  fixedHelp: "Se llena con la Utilidad que genera cada ingreso del mes, antes de impuestos.",
} as const;

/** Textos de la caja de viabilidad y su detalle. */
export const VIABILITY_COPY = {
  pending:
    "Ingresa la nómina (mínimo $200.000) y el sistema calcula el punto de equilibrio y revisa si el modelo es viable.",
  titles: { viable: "Modelo viable", avisos: "Modelo viable, con avisos", noViable: "Modelo no viable" },
  showDetail: "Ver detalle",
  hideDetail: "Ocultar detalle",
  headers: ["Fase", "Cómo se reparte", "Acumulado", "Show"],
  rulerLead: "Así se ve un mes, show por show:",
  footnote: (nomina: string) => `Shows contados con el valor de la nómina (${nomina}). * El show se reparte entre dos fases.`,
} as const;

/** Etiquetas y textos de las filas de la tabla de fases. */
export const PHASE_COPY = {
  service: "Servicio",
  untilMin: "Hasta el mínimo",
  afterMin: "Después del mínimo",
  serviceHow: (service: string) => `100% a Servicio hasta ${service}`,
  untilHow: (investment: string, profit: string) => `${investment}% Inversión · ${profit}% Utilidad`,
  untilHowAdsme: (investment: string, profit: string, service: string) =>
    `${investment}% Inversión · ${profit}% Utilidad (primero paga el Servicio de ${service})`,
  afterHow: (post: string) => `${post} Utilidad por show · resto Inversión`,
  afterHowAdsme: (post: string) =>
    `${post} Utilidad por show (hasta cubrir el Servicio, luego gana AdsME) · resto Inversión`,
  afterHowFlat: (investment: string, profit: string) => `${investment}% Inversión · ${profit}% Utilidad (sin cambio)`,
  upTo: (show: string) => `hasta ${show}`,
  from: (show: number) => `desde ${show}`,
  none: "—",
} as const;
