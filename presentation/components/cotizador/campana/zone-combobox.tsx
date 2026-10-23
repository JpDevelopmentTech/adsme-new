"use client";

import { useId, useState } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { ZoneOptionsList } from "@/presentation/components/cotizador/campana/zone-options-list";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteCombobox } from "@/presentation/hooks/use-quote-combobox";
import type { TargetPartProps, ZoneOption } from "@/types/quote-campaign.types";
import { buildZoneOptionGroups } from "@/utils/build-zone-option-groups";

/**
 * Buscador de zonas de un segmento: ciudades, divisiones o zonas agrupadas de
 * sus países. Enter agrega la resaltada o lo escrito tal cual; Retroceso con
 * el campo vacío quita la última zona.
 */
export function ZoneCombobox({ target }: TargetPartProps) {
  const { dispatch, reference } = useQuote();
  const listId = useId();
  const [query, setQuery] = useState("");
  const groups = buildZoneOptionGroups({ catalog: reference.catalog, target, query });
  const options = groups.flatMap((group) => group.options);

  const add = (option: ZoneOption) => {
    dispatch({ type: "addTargetZone", targetId: target.id, zone: option.name, composition: option.composition });
    setQuery("");
  };
  const combobox = useQuoteCombobox(options, {
    onPick: add,
    onEnterFree: () => {
      if (query.trim()) add({ id: "", name: query.trim() });
    },
  });
  const optionId = (index: number) => `${listId}-${index}`;

  return (
    <div className="relative min-w-[min(100%,15rem)] flex-1">
      <input
        type="text"
        role="combobox"
        autoComplete="off"
        aria-label={CAMPAIGN_COPY.zones.label}
        aria-autocomplete="list"
        aria-expanded={combobox.isOpen}
        aria-controls={listId}
        aria-activedescendant={combobox.activeIndex >= 0 ? optionId(combobox.activeIndex) : undefined}
        placeholder={CAMPAIGN_COPY.zones.placeholder}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          combobox.setIsOpen(true);
          combobox.setActiveIndex(-1);
        }}
        onFocus={() => combobox.setIsOpen(true)}
        onBlur={() => combobox.setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Backspace" && !query && target.zones.length) {
            dispatch({ type: "removeTargetZone", targetId: target.id, zone: target.zones[target.zones.length - 1] });
            return;
          }
          combobox.onKeyDown(event);
        }}
        className="h-10 w-full rounded-pill border border-border bg-transparent px-3.5 text-[13px] text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
      />
      {combobox.isOpen ? (
        <ZoneOptionsList
          listId={listId}
          groups={groups}
          query={query}
          activeIndex={combobox.activeIndex}
          optionId={optionId}
          onHover={combobox.setActiveIndex}
          onPick={add}
        />
      ) : null}
    </div>
  );
}
