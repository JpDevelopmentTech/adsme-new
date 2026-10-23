export const CURRENCY_SYMBOL = "$";

export const THOUSAND = 1_000;

export const MILLION = 1_000_000;

/** Locale usado para separar miles y decimales en los importes. */
export const CURRENCY_LOCALE = "es-CO";

/** Moneda del negocio: la de los presupuestos y la del CPV cobrado. */
export const BASE_CURRENCY = "COP";

/** La única moneda que se convierte a pesos, con la TRM fijada en cada trabajo. */
export const TRM_CURRENCY = "USD";

/**
 * Moneda que se asume cuando la plataforma no la informa. Solo aplica al buzón
 * de Google mientras el script desplegado sea anterior al que envía `currency`.
 */
export const DEFAULT_ACCOUNT_CURRENCY = "COP";

/**
 * Prefijo de cada moneda al escribir un importe. El dólar lleva «US$» y no «$»
 * a secas: en Colombia «$» son pesos, y confundirlos es justo lo que se evita.
 */
export const CURRENCY_SYMBOLS: Readonly<Record<string, string>> = {
  COP: "$",
  USD: "US$",
};

/**
 * Orden en que se listan las monedas: pesos, dólares y, detrás, cualquier otra
 * por orden alfabético. Importes de monedas distintas no se comparan entre sí.
 */
export const CURRENCY_ORDER: readonly string[] = ["COP", "USD"];

/** Separador entre importes de monedas distintas: «$8,9 M + US$876». */
export const SPEND_JOINER = " + ";
