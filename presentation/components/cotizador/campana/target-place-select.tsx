"use client";

import { ChevronDown } from "lucide-react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { TargetPartProps } from "@/types/quote-campaign.types";

const COPY = CAMPAIGN_COPY.target;

/** «+ País o región»: agrega al segmento un país o una región que aún no tenga. */
export function TargetPlaceSelect({ target }: TargetPartProps) {
  const { dispatch, reference } = useQuote();
  const free = <T extends { code: string }>(places: T[]) => places.filter((place) => !target.places.includes(place.code));
  const countries = free(reference.catalog.countries);
  const regions = free(reference.catalog.regions);

  return (
    <span className="relative inline-flex h-10 items-center rounded-pill border border-border bg-surface transition-colors focus-within:ring-2 focus-within:ring-lilac hover:border-border-strong">
      <select
        aria-label={COPY.addPlaceLabel}
        value=""
        onChange={(event) => {
          if (event.target.value) dispatch({ type: "addTargetPlace", targetId: target.id, code: event.target.value });
        }}
        className="h-full cursor-pointer appearance-none bg-transparent pr-9 pl-3.5 text-[13px] text-text-secondary outline-none [&_optgroup]:bg-[#140c26] [&_option]:bg-[#140c26] [&_option]:text-text-primary"
      >
        <option value="">{COPY.addPlace}</option>
        {countries.length ? (
          <optgroup label={COPY.countries}>
            {countries.map((place) => <option key={place.code} value={place.code}>{place.name}</option>)}
          </optgroup>
        ) : null}
        {regions.length ? (
          <optgroup label={COPY.regions}>
            {regions.map((place) => <option key={place.code} value={place.code}>{place.name}</option>)}
          </optgroup>
        ) : null}
      </select>
      <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3 text-text-muted" />
    </span>
  );
}
