export const CURRENCY_SYMBOL = "$";

export const THOUSAND = 1_000;

export const MILLION = 1_000_000;

/** Locale usado para separar miles y decimales en los importes. */
export const CURRENCY_LOCALE = "es-CO";

/**
 * Moneda en la que adsme suma y muestra todo el gasto. Las cuentas en otra
 * moneda se convierten a esta con la tasa vigente del día (`exchange_rates`).
 */
export const REPORTING_CURRENCY = "COP";

/**
 * Moneda que se asume cuando la plataforma no la informa. Solo aplica al buzón
 * de Google mientras el script desplegado sea anterior al que envía `currency`.
 */
export const DEFAULT_ACCOUNT_CURRENCY = "COP";

/**
 * Monedas que adsme sabe pasar a pesos: la propia y el dólar, con la TRM. Una
 * cuenta en cualquier otra se sumaría sin convertir, así que la sincronización
 * lo avisa en vez de callarlo.
 */
export const CONVERTIBLE_CURRENCIES: readonly string[] = ["COP", "USD"];

export const CURRENCY_ERRORS = {
  notConvertible: (currency: string) =>
    `La cuenta reporta en ${currency} y adsme solo convierte dólares a pesos: su gasto se suma sin convertir.`,
} as const;
