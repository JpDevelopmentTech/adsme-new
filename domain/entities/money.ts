/**
 * Un importe con su moneda. El gasto de una campaña está en la moneda de su
 * cuenta publicitaria, y dos importes solo se pueden sumar si comparten moneda:
 * llevarla pegada al número es lo que impide sumar dólares con pesos.
 */
export interface Money {
  amount: number;
  /** Código ISO 4217 (`COP`, `USD`…). */
  currency: string;
}

/**
 * Gasto repartido por moneda, sin convertir: `{ COP: 8_900_000, USD: 876 }`.
 * Solo lleva las monedas con importe distinto de cero.
 */
export type SpendByCurrency = Readonly<Record<string, number>>;
