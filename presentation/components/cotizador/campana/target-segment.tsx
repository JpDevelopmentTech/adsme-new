"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { RemovableChip } from "@/presentation/components/cotizador/campana/removable-chip";
import { TargetPctField } from "@/presentation/components/cotizador/campana/target-pct-field";
import { TargetPlaceSelect } from "@/presentation/components/cotizador/campana/target-place-select";
import { ZoneCombobox } from "@/presentation/components/cotizador/campana/zone-combobox";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { TargetSegmentProps } from "@/types/quote-campaign.types";
import { findZoneComposition } from "@/utils/find-zone-composition";
import { quotePlaceNamer } from "@/utils/quote-place-namer";

const COPY = CAMPAIGN_COPY.target;

/** Segmento de público: su %, los países o regiones y, debajo, las zonas. */
export function TargetSegment({ target, index, isRemovable }: TargetSegmentProps) {
  const { dispatch, reference } = useQuote();
  const placeName = quotePlaceNamer(reference.catalog);
  const targetId = target.id;

  return (
    <div role="group" aria-label={COPY.segment(index + 1)} className="flex flex-col gap-2.5 rounded-tile border border-border bg-white/[0.02] p-3">
      <div className="flex flex-wrap items-center gap-2">
        <TargetPctField value={target.pct} onChange={(pct) => dispatch({ type: "setTargetPct", targetId, pct })} />
        {target.places.map((code) => (
          <RemovableChip key={code} label={placeName(code)} onRemove={() => dispatch({ type: "removeTargetPlace", targetId, code })} />
        ))}
        <TargetPlaceSelect target={target} />
        {isRemovable ? (
          <button
            type="button"
            aria-label={COPY.removeSegmentLabel}
            onClick={() => dispatch({ type: "removeTarget", targetId })}
            className="ml-auto h-10 cursor-pointer rounded-pill px-3 text-xs text-text-muted transition-colors hover:bg-danger/12 hover:text-danger focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            {COPY.removeSegment}
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-2.5">
        {target.zones.map((zone) => (
          <RemovableChip
            key={zone}
            label={zone}
            title={findZoneComposition(reference.catalog.zones, zone)}
            onRemove={() => dispatch({ type: "removeTargetZone", targetId, zone })}
          />
        ))}
        <ZoneCombobox target={target} />
      </div>
    </div>
  );
}
