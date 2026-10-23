"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { DEFAULT_SPLIT_SETTINGS, MIN_VIABLE_NOMINA } from "@/constants/nomina-modales.constants";
import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { nominaArtistRoute } from "@/constants/routes.constants";
import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import { enrollNominaArtistAction } from "@/presentation/actions/enroll-nomina-artist-action";
import { useNominaSplitModel } from "@/presentation/hooks/use-nomina-split-model";
import type { NewArtistFormState } from "@/types/nomina-modales-artista.types";
import { suggestMinShows } from "@/utils/suggest-min-shows";
import { todayIso } from "@/utils/today-iso";

/**
 * Estado del alta en Nómina: el cliente elegido, su nómina, el mínimo de shows
 * (sugerido por tramo), la vigencia y el modelo de reparto. Guardar inscribe al
 * cliente y abre su perfil.
 */
export function useNewArtistForm(initialClient: NominaEligibleClient | undefined, onDone: () => void): NewArtistFormState {
  const router = useRouter();
  const [client, setClient] = useState<NominaEligibleClient | null>(initialClient ?? null);
  const [nomina, setNomina] = useState<number | null>(null);
  const [customMin, setMinShows] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(todayIso);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();

  const isNominaValid = nomina !== null && nomina >= MIN_VIABLE_NOMINA;
  const suggestedMin = isNominaValid ? suggestMinShows(nomina) : null;
  const minShows = isNominaValid ? (customMin ?? suggestedMin) : null;
  const split = useNominaSplitModel(DEFAULT_SPLIT_SETTINGS, nomina, minShows);
  const canSave = client !== null && isNominaValid && minShows !== null && split.isViable && !isSaving;

  const submit = () => {
    if (!client || nomina === null || minShows === null) return;
    setError(null);
    startSaving(async () => {
      const result = await enrollNominaArtistAction({ clientId: client.id, nomina, minShows, startsOn: startDate, split: split.settings });
      if (!result.ok) return setError(result.message);
      onDone();
      router.push(nominaArtistRoute(client.id));
    });
  };

  return {
    client,
    setClient,
    nomina,
    setNomina,
    nominaError: nomina !== null && nomina < MIN_VIABLE_NOMINA ? NEW_ARTIST_COPY.nominaError : null,
    suggestedMin,
    minShows,
    setMinShows,
    threshold: isNominaValid && minShows !== null ? minShows * nomina : null,
    split,
    startDate,
    setStartDate,
    canSave,
    isSaving,
    error,
    submit,
  };
}
