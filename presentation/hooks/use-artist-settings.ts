"use client";

import { useState } from "react";
import { SOCIAL_NETWORKS } from "@/constants/nomina-modales-redes.constants";
import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";
import { useNominaSplitModel } from "@/presentation/hooks/use-nomina-split-model";
import type { NominaSettingsState, NominaSettingsTab, SettingsModalProps } from "@/types/nomina-modales-perfil.types";
import { buildSocialDraft } from "@/utils/build-social-draft";
import { checkSocialUrl } from "@/utils/check-social-url";
import { initialArtistSettings } from "@/utils/initial-artist-settings";

/**
 * Estado de «Configuración de {artista}»: mínimo de shows, modelo de reparto y
 * enlaces. Desde «Redes y enlaces» se guarda aunque el modelo no sea viable.
 */
export function useArtistSettings({ artist, socials, minShows: savedMin, fixedProfitGoal, serviceAssumedByAdsme }: SettingsModalProps): NominaSettingsState {
  const [tab, setTab] = useState<NominaSettingsTab>("modelo");
  const [minShows, setMinShows] = useState<number | null>(savedMin);
  const [links, setLinks] = useState(() => buildSocialDraft(socials));
  const split = useNominaSplitModel(initialArtistSettings(fixedProfitGoal, serviceAssumedByAdsme), artist.nomina, minShows ?? 0);

  const setLink = (network: NominaSocialNetwork, url: string) => setLinks((current) => ({ ...current, [network]: url }));
  const hasInvalidLink = SOCIAL_NETWORKS.some(({ key, domains }) => checkSocialUrl(links[key], domains) === "invalid");

  return {
    tab,
    setTab,
    minShows,
    setMinShows,
    split,
    links,
    setLink,
    canSave: !hasInvalidLink && (tab === "redes" || split.isViable),
  };
}
