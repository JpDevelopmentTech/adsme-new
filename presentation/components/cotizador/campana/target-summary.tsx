"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { describeTargetPlaces } from "@/domain/use-cases/quote/describe-quote-audience";
import { formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { useQuote } from "@/presentation/hooks/use-quote";
import { quotePlaceNamer } from "@/utils/quote-place-namer";

/** Público recogido: un renglón por segmento, «50% · México, Perú». */
export function TargetSummary() {
  const { state, reference } = useQuote();
  const placeName = quotePlaceNamer(reference.catalog);

  if (!state.draft.targets.length) return <span className="text-text-muted">{CAMPAIGN_COPY.target.empty}</span>;
  return (
    <div className="flex flex-col gap-1">
      {state.draft.targets.map((target) => (
        <p key={target.id}>
          <strong className="font-normal text-text-primary tabular-nums">
            {target.pct === null ? CAMPAIGN_COPY.target.noPct : `${formatQuotePct(target.pct)}%`}
          </strong>
          {" · "}
          {describeTargetPlaces(target, placeName)}
        </p>
      ))}
    </div>
  );
}
