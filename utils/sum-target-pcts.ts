import type { QuoteTarget } from "@/domain/entities/quote";

/** Suma de los % de los segmentos; los vacíos cuentan como 0. */
export function sumTargetPcts(targets: QuoteTarget[]): number {
  return targets.reduce((sum, target) => sum + (target.pct ?? 0), 0);
}
