/** Errores literales del análisis del modelo: bloquean Guardar. */
export const VIABILITY_ERRORS = {
  minShows: "El Mínimo de Shows debe ser al menos 1.",
  serviceEmpty: "Escribe cuánto es el Servicio (o desactiva «¿Aplica Servicio?»).",
  serviceTooHigh: (service: string, threshold: string) =>
    `El Servicio (${service}) iguala o supera el punto de equilibrio (${threshold}): no quedaría nada para Inversión ni Utilidad.`,
  percentRange: "El % de Utilidad debe estar entre 0 y 100.",
  postTooHigh: (post: string, nomina: string) =>
    `La Utilidad por show después del mínimo (${post}) supera el valor de un show (${nomina}).`,
  noProfit: "Con 0% de Utilidad y sin Utilidad por show, la ganancia sería siempre $0.",
  fixedEmpty: "Escribe el monto de la Utilidad fija (o desactiva «¿Aplica Utilidad Fija?»).",
  fixedUnreachable: (fixed: string, nomina: string) =>
    `La Utilidad fija (${fixed}) no se alcanza ni con 60 shows de ${nomina} al mes.`,
} as const;

/** Avisos literales: el modelo se puede guardar igual. */
export const VIABILITY_WARNINGS = {
  postOverHalf: (post: string, nomina: string) =>
    `La Utilidad por show después del mínimo es más de la mitad de un show (${post} de ${nomina}).`,
  noScalability: "Sin Escalabilidad, el % de Utilidad no cambia después del Mínimo de Shows.",
  fixedLate: (fixed: string, show: number, min: number) =>
    `La Utilidad fija (${fixed}) se logra recién en el show ${show}, después del Mínimo de Shows (${min}).`,
  adsmeLate: (show: number, min: number) =>
    `AdsME empieza a ganar recién en el show ${show}, después del Mínimo de Shows (${min}): hasta ahí la Utilidad solo paga el Servicio.`,
  adsmeNever: (nomina: string, service: string) =>
    `Con 60 shows de ${nomina} la Utilidad no cubre el Servicio (${service}): AdsME nunca ganaría en un mes.`,
} as const;

/** Confirmaciones literales que se ven al abrir el detalle. */
export const VIABILITY_CHECKS = {
  threshold: (min: number, nomina: string, threshold: string) =>
    `Punto de equilibrio = ${min} shows × ${nomina} = ${threshold}.`,
  adsmeAssumes: (service: string) =>
    `AdsME asume el Servicio (${service}): el dinero del cliente no lo paga. La Utilidad lo cubre primero y, cuando se completa, empieza a ganar AdsME.`,
  adsmeEarnsFrom: (nomina: string, show: number) =>
    `Con shows de ${nomina}, AdsME empieza a ganar desde el show ${show} del mes.`,
  adsmeNeverEarns: (nomina: string) =>
    `Con shows de ${nomina}, AdsME no alcanza a ganar en un mes: la Utilidad no cubre el Servicio.`,
  clientSplit: (profit: string, investment: string) =>
    `Hasta el punto de equilibrio: ${profit}% Utilidad y ${investment}% Inversión, después de cubrir el Servicio.`,
  afterMin: (post: string) => `Después del mínimo: ${post} de Utilidad por show y el resto a Inversión.`,
  monthProfit: (min: number, profit: string, net: string) =>
    `Al completar los ${min} shows el mes deja ${profit} de Utilidad (${net} netos de impuestos).`,
  fixedAt: (show: number) => `La Utilidad fija se logra en el show ${show}.`,
} as const;
