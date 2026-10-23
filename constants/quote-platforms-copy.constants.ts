/** Barra «Plataformas» y estado vacío antes de la primera. */
export const PLATFORMS_BAR_COPY = {
  title: "Plataformas",
  collapseAll: "Recoger todas",
  expandAll: "Expandir todas",
  emptyTitle: "Empieza por la primera plataforma",
  emptyText: "Elige abajo dónde va la pauta y escribe el presupuesto del cliente o la pauta real: el servicio, la comisión y el reparto por línea se calculan solos.",
  emptyHint: "Agregar plataforma",
} as const;

/** Cabecera de la tarjeta de plataforma. */
export const PLATFORM_HEADER_COPY = {
  nameLabel: "Nombre de la plataforma",
  discount: "Con descuento",
  loss: "Pérdida",
  underBudget: "Presupuesto menor al servicio",
  lockLabel: "Bloquear total de la plataforma",
  lockTitle: "Bloquear el total de esta plataforma",
  unlockTitle: "Desbloquear el total de esta plataforma",
  collapse: "Recoger",
  expand: "Expandir",
  remove: "Quitar",
} as const;

/** Presupuesto, cascada y pauta real de la plataforma. */
export const PLATFORM_BODY_COPY = {
  budget: "Presupuesto del cliente (total)",
  budgetLabel: "Presupuesto del cliente",
  fixedTotal: "Fijo",
  fixedPauta: "Fija",
  fixedTitle: "Se mantiene cuando cambias descuentos",
  stepService: "− Servicio",
  stepWork: "Valor a trabajar",
  stepFeePrefix: "−",
  stepFeeSuffix: "% AdsME",
  stepPauta: "Pauta real",
  barLabel: "Reparto del presupuesto",
  pauta: "Pauta real en plataforma",
  pautaNote: "el resultado alcanzado es opcional",
  lineLabel: "Resultado o concepto",
  optionalSuffix: " (opcional)",
  lineLock: "Bloquear porcentaje",
  lineLockTitle: "Bloquear este %: no cambia cuando ajustes otras líneas",
  lineUnlockTitle: "Desbloquear: este % puede cambiar",
  linePct: "Participación de la línea",
  linePctTitle: "Participación de esta línea en la pauta",
  lineAmount: "Monto de pauta",
  removeLine: "Quitar línea",
  addLine: "+ Agregar línea",
  defaultLine: "Pauta",
  multiLinePrefix: "Campaña",
} as const;

/** Bloques «% AdsME» y «Servicio Marker». */
export const PLATFORM_FEES_COPY = {
  feeTitle: "% AdsME sobre valor a trabajar",
  feeStandardPrefix: "estándar",
  feeCharged: "% que cobras",
  feeDiscount: "Descuento",
  feeStandardSuffix: "% del valor a trabajar",
  feeResult: "Comisión que cobras",
  serviceTitle: "Servicio Marker",
  serviceCharge: "Cobrar",
  months: "Meses de servicio",
  monthLess: "Un mes menos",
  monthMore: "Un mes más",
  serviceDiscountPct: "Descuento %",
  serviceDiscount: "Descuento",
  serviceGross: "Servicio",
  notCharged: " · no se cobra",
  serviceResult: "Servicio que cobras",
  month: "mes",
  monthsPlural: "meses",
} as const;

/** Descripción y pie de la tarjeta. */
export const PLATFORM_FOOTER_COPY = {
  notesPrefix: "Descripción / Comentarios de",
  notesNote: "opcional · sale en la cotización",
  notesPlaceholder: "Ej: campaña de lanzamiento del sencillo, 30 días, enfoque en reproducciones…",
  totalDiscount: "Descuento total",
  profit: "Ganancia AdsME",
  services: "Servicios",
  totalPrefix: "Total",
  share: "% del total",
  shareLabel: "Participación en el total general",
} as const;

/** «Agregar plataforma» y «Condiciones y notas generales». */
export const PLATFORMS_EXTRA_COPY = {
  addTitle: "Agregar plataforma",
  addSubtitle: "Escribe el presupuesto del cliente o la pauta real; el otro valor se calcula solo.",
  termsTitle: "Condiciones y notas generales",
  termsSubtitle: "Métodos de pago, condiciones contractuales, vigencia, entregables… Sale al final de la cotización, después del total general.",
  termsLabel: "Condiciones y notas generales",
  termsPlaceholder: "Ej: 50% al inicio y 50% al lanzar la campaña. Pago por transferencia bancaria. Cotización válida por 15 días.",
  payments: "Incluir métodos de pago en el PDF",
  paymentsUnavailable: "No disponibles en esta vista.",
  paymentsAvailableSuffix: " — salen en dos columnas al final del PDF.",
} as const;

/** Colores de la barra de la cascada: servicio, comisión y pauta real. */
export const QUOTE_CASCADE_COLORS = {
  service: "bg-[#A79FC2]",
  fee: "bg-[#5EE6A8]",
  pauta: "bg-[#C9B6FF]",
} as const;

/** Nombre accesible de cada tramo de la barra de la cascada. */
export const QUOTE_CASCADE_LABELS = {
  service: "servicio",
  fee: "comisión AdsME",
  pauta: "pauta real",
} as const;

/** Umbral bajo el cual un importe se considera cero (redondeos de centavos). */
export const QUOTE_MONEY_EPSILON = 0.004;

/** Atributo que marca el campo de presupuesto de cada plataforma para enfocarlo al agregarla. */
export const PLATFORM_BUDGET_ATTR = "data-platform-budget";

/** Color del importe en las cifras del pie según su tono. */
export const FOOTER_STAT_TONES = {
  default: "text-text-primary",
  warning: "text-warning",
  danger: "text-danger",
  success: "text-success",
} as const;
