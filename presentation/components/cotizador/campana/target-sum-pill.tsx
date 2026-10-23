"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import { useQuote } from "@/presentation/hooks/use-quote";
import { sumTargetPcts } from "@/utils/sum-target-pcts";

/** Suma de los % de los segmentos: verde si da 100 %, ámbar con aviso si no. */
export function TargetSumPill() {
  const { state } = useQuote();
  const sum = sumTargetPcts(state.draft.targets);
  const isComplete = Math.abs(sum - 100) < 0.01;

  return (
    <StatusBadge
      tone={isComplete ? "success" : "warning"}
      label={isComplete ? CAMPAIGN_COPY.target.sumOk : CAMPAIGN_COPY.target.sumOff(formatQuotePct(sum))}
    />
  );
}
