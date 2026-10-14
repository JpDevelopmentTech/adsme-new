import type { NominaMovement } from "@/domain/entities/nomina-movement";

/** Totales de ingreso y de cada bolsa de una lista de movimientos. */
export function sumMovements(movements: NominaMovement[]) {
  return movements.reduce(
    (total, movement) => ({
      amount: total.amount + movement.amount,
      service: total.service + movement.split.service,
      profit: total.profit + movement.split.profit,
      taxes: total.taxes + movement.split.taxes,
      netProfit: total.netProfit + movement.split.netProfit,
      investment: total.investment + movement.split.investment,
    }),
    { amount: 0, service: 0, profit: 0, taxes: 0, netProfit: 0, investment: 0 },
  );
}
