/** Parámetros de la URL con los que viaja un período elegido por el usuario. */
export const PERIOD_PARAMS = { from: "desde", to: "hasta" } as const;

/** Textos del formulario Desde/Hasta, compartidos por el dashboard y el reporte. */
export const PERIOD_FORM_COPY = {
  label: "Elegir período",
  from: "Desde",
  to: "Hasta",
  apply: "Aplicar",
  applying: "Aplicando período",
  invalidDate: "Escribe una fecha completa en las dos casillas.",
  invalidOrder: "La fecha final no puede ser anterior a la inicial.",
  tooLong: (maxDays: number) => `El período puede abarcar como mucho ${maxDays} días.`,
  outOfBounds: (min: string, max: string) => `Elige fechas entre el ${min} y el ${max}.`,
} as const;
