"use client";

import { useState } from "react";
import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import { foldSearchText } from "@/utils/fold-search-text";

/** Píldora «+ Otro género»: Enter agrega el género y lo deja seleccionado. */
export function CustomGenreInput() {
  const { state, dispatch, reference } = useQuote();
  const [value, setValue] = useState("");

  function submit() {
    const name = value.trim();
    if (!name) return;
    const known = [...reference.catalog.genres, ...state.draft.customGenres].find((genre) => foldSearchText(genre) === foldSearchText(name));
    if (!known) dispatch({ type: "addGenre", name });
    else if (!state.draft.genres.includes(known)) dispatch({ type: "toggleGenre", name: known });
    setValue("");
  }

  return (
    <input
      type="text"
      aria-label={CAMPAIGN_COPY.genre.custom}
      placeholder={CAMPAIGN_COPY.genre.custom}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        submit();
      }}
      className="h-10 w-36 rounded-pill border border-dashed border-border-strong bg-transparent px-3.5 text-[13px] text-text-primary outline-none transition-colors placeholder:text-text-muted focus:w-48 focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac motion-reduce:transition-none"
    />
  );
}
