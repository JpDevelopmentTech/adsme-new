"use client";

import { useState } from "react";
import { DEFAULT_SPLIT_SETTINGS, MIN_VIABLE_NOMINA } from "@/constants/nomina-modales.constants";
import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { useArtistPhoto } from "@/presentation/hooks/use-artist-photo";
import { useNewArtistExpress } from "@/presentation/hooks/use-new-artist-express";
import { useNominaSplitModel } from "@/presentation/hooks/use-nomina-split-model";
import type { NewArtistFormState } from "@/types/nomina-modales-artista.types";
import { suggestMinShows } from "@/utils/suggest-min-shows";
import { todayIso } from "@/utils/today-iso";

/**
 * Estado del alta de artista. Solo valida lo visible (nombre repetido, nómina
 * mínima, mes del Express y viabilidad del modelo); guardar no persiste nada.
 */
export function useNewArtistForm(existingNames: string[]): NewArtistFormState {
  const [name, setName] = useState("");
  const [nomina, setNominaState] = useState<number | null>(null);
  const [isNominaAuto, setIsNominaAuto] = useState(true);
  const [customMin, setMinShows] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(todayIso);
  const photo = useArtistPhoto();

  const isNominaValid = nomina !== null && nomina >= MIN_VIABLE_NOMINA;
  const suggestedMin = isNominaValid ? suggestMinShows(nomina) : null;
  const minShows = isNominaValid ? (customMin ?? suggestedMin) : null;
  const split = useNominaSplitModel(DEFAULT_SPLIT_SETTINGS, nomina, minShows);

  const setNomina = (value: number | null) => {
    setNominaState(value);
    setIsNominaAuto(value === null);
  };
  const express = useNewArtistExpress((presetNomina) => {
    if (isNominaAuto) setNominaState(presetNomina);
  });

  const trimmed = name.trim().toLocaleLowerCase("es");
  const isDuplicate = trimmed.length > 0 && existingNames.some((item) => item.trim().toLocaleLowerCase("es") === trimmed);
  const nominaError = nomina !== null && nomina < MIN_VIABLE_NOMINA ? NEW_ARTIST_COPY.nominaError : null;
  const isExpressReady = !express.isOn || (express.amount > 0 && express.coveredMonth !== "");

  return {
    name,
    setName,
    isDuplicate,
    photo,
    nomina,
    setNomina,
    nominaError,
    suggestedMin,
    minShows,
    setMinShows,
    threshold: isNominaValid && minShows !== null ? minShows * nomina : null,
    split,
    express,
    startDate,
    setStartDate,
    canSave: trimmed.length > 0 && !isDuplicate && isNominaValid && isExpressReady && split.isViable,
  };
}
