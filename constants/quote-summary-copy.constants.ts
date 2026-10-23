/** Textos de la cabecera del cotizador. */
export const QUOTE_HEADER_COPY = {
  title: "Cotizador",
  subtitle: "Cotizador de campañas",
  trmLabel: "TRM",
  trmPlaceholder: "3.900",
  trmHint: "Tasa representativa del mercado: pesos por 1 dólar",
  trmOfficial: "Oficial",
  trmCustom: "Personalizada",
  trmCustomHint: "TRM escrita por ti",
  currencyLabel: "Moneda",
  settings: "Tarifas base",
  newQuote: "Nueva cotización",
  confirmQuestion: "¿Borrar todo?",
  confirmYes: "Sí, nueva",
  confirmCancel: "Cancelar",
} as const;

/** Textos del panel «Tarifas base». */
export const QUOTE_SETTINGS_COPY = {
  panelLabel: "Tarifas base",
  fee: "% AdsME estándar",
  serviceCop: "Servicio Marker en COP",
  serviceUsd: "Servicio Marker en USD",
  howTitle: "Cómo se calcula",
  howText: "Presupuesto − servicio = valor a trabajar. El % sale de ese valor y lo que queda es la pauta real. El servicio no se convierte con la TRM.",
} as const;

/** Textos de la tarjeta del total general. */
export const QUOTE_GRAND_COPY = {
  title: "Total general",
  fixed: "Fijo",
  release: "Soltar",
  releaseHint: "Soltar: el total vuelve a ser la suma de las plataformas",
  profit: "Ganancia AdsME",
  pauta: "Pauta real",
  service: "Servicios",
  discount: "Descuentos",
  noteSplit: "Las plataformas se reparten este total.",
  noteFirst: "Agrega plataformas: la primera toma este total.",
  noteHint: "Escribe un total para repartirlo entre plataformas.",
  barLabel: "Reparto del total",
  barService: "Servicio",
  barProfit: "Ganancia",
  barPauta: "Pauta real",
} as const;

/** Textos de «Tus márgenes». */
export const QUOTE_MARGINS_COPY = {
  title: "Tus márgenes",
  note: "no salen en la cotización",
  platform: "Plataforma",
  pct: "%",
  profit: "Ganancia",
  service: "Servicio",
  total: "Total",
  empty: "Sin plataformas",
} as const;

/** Textos del bloque «Cotización» y sus salidas. */
export const QUOTE_DOCUMENT_COPY = {
  title: "Cotización",
  entityLabel: "Retirar de",
  empty: "Agrega una plataforma para empezar a cotizar.",
  description: "Descripción:",
  terms: "Condiciones y notas",
  usdHeader: "Cotización en USD · TRM:",
  perDollar: "por dólar",
  usedTrm: "TRM utilizada:",
  withdrawFrom: "Retirar de",
  fallbackLabel: "Texto de la cotización",
} as const;

/** Botones de salida de la cotización. */
export const QUOTE_ACTIONS_COPY = {
  whatsapp: "Copiar WhatsApp",
  whatsappHint: "Cotización para el cliente",
  copied: "✓ Copiado",
  more: "Más formatos",
  marker: "Para Cotizar",
  markerHint: "Consulta de alcance para el Marker",
  doc: "Copiar Doc",
  docHint: "Texto plano para Word o Google Docs",
  pdf: "Generar PDF",
  save: "Guardar",
} as const;

/** Avisos literales de las salidas. */
export const QUOTE_OUTPUT_TOASTS = {
  whatsapp: "Cotización copiada. Pégala en WhatsApp.",
  doc: "Texto copiado. Pégalo en tu documento.",
  marker: "Consulta copiada. Envíala al Marker por WhatsApp.",
  fallback: "Selecciona y copia el texto de abajo",
  needPlatform: "Agrega al menos una plataforma",
  pdfReady: "PDF listo",
  trmApplied: "TRM oficial aplicada:",
} as const;

/** Petición de alcance que encabeza la consulta al Marker. */
export const QUOTE_MARKER_ASK = "Hola, ¿nos ayudas a cotizar estas campañas? Queremos saber el alcance estimado que se puede lograr con cada presupuesto.";

/** Textos del PDF. */
export const QUOTE_PRINT_COPY = {
  heading: "COTIZACIÓN",
  date: "Fecha:",
  reference: "Ref.:",
  details: "Detalles de la campaña",
  description: "Descripción",
  investment: "Inversión por plataforma",
  grand: "TOTAL GENERAL",
  terms: "Condiciones y notas",
  payments: "Métodos de pago",
  copNote: "Valores expresados en pesos colombianos (COP).",
  usdNote: "Valores expresados en dólares (USD) con TRM de",
  logoAlt: "AdsME",
} as const;

/** Textos de la barra inferior móvil. */
export const QUOTE_MOBILE_BAR_COPY = {
  label: "Total general",
  edit: "Editar",
  quote: "Cotización",
  nav: "Ir a",
} as const;
