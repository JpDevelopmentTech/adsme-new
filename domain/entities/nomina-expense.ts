/** Tipos de gasto que se registran a un artista. */
export type NominaExpenseType = "servicio" | "spotify" | "otro";

/** De qué bolsa se descuenta un gasto. */
export type NominaExpenseTarget = "ads" | "servicio";

/** Pago de Servicio o a un proveedor hecho por cuenta del artista. */
export interface NominaExpense {
  id: string;
  type: NominaExpenseType;
  concept: string;
  provider?: string;
  description?: string;
  amount: number;
  target: NominaExpenseTarget;
  date: string;
  assignedMonth: string;
}
