"use client";

import { useMemo } from "react";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { grandValue, moneyContext } from "@/domain/use-cases/quote/quote-grand-total";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuoteFigures } from "@/types/quote-figures.types";

/** Cifras de cada plataforma y los totales de la cotización, recalculados al cambiar. */
export function useQuoteFigures(): QuoteFigures {
  const { state } = useQuote();
  const { draft } = state;

  return useMemo(() => {
    const ctx = moneyContext(draft);
    const byPlatform = Object.fromEntries(draft.platforms.map((p) => [p.id, calculateQuotePlatform(p, ctx)]));
    const all = Object.values(byPlatform);
    const add = (pick: (f: (typeof all)[number]) => number) => all.reduce((sum, f) => sum + pick(f), 0);
    return {
      byPlatform,
      sum: add((f) => f.total),
      grand: grandValue(draft),
      profit: add((f) => f.fee),
      pauta: add((f) => f.pauta),
      service: add((f) => f.service),
      discount: add((f) => f.discount),
    };
  }, [draft]);
}
