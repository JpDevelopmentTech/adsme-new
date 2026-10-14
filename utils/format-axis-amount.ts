/** Importe corto para ejes y metas: `1,8M`, `300K`, `0`. */
export function formatAxisAmount(amount: number): string {
  if (amount === 0) return "0";
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1).replace(".", ",").replace(",0", "")}M`;
  return `${Math.round(amount / 1_000)}K`;
}
