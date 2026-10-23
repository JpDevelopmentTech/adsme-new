"use client";

import { useState, useTransition } from "react";
import { SOCIAL_NETWORKS } from "@/constants/nomina-modales-redes.constants";
import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";
import { saveNominaArtistConfigAction } from "@/presentation/actions/save-nomina-artist-config-action";
import { saveNominaArtistSocialsAction } from "@/presentation/actions/save-nomina-artist-socials-action";
import { useNominaSplitModel } from "@/presentation/hooks/use-nomina-split-model";
import type { NominaSettingsState, NominaSettingsTab, SettingsModalProps } from "@/types/nomina-modales-perfil.types";
import { buildSocialDraft } from "@/utils/build-social-draft";
import { checkSocialUrl } from "@/utils/check-social-url";

/**
 * Estado de «Configuración de {artista}»: mínimo de shows, modelo de reparto y
 * enlaces, precargados con lo guardado. Cada pestaña guarda lo suyo; desde
 * «Redes y enlaces» se guarda aunque el modelo no sea viable.
 */
export function useArtistSettings({ artist, socials, minShows: savedMin, split: savedSplit, onClose }: SettingsModalProps): NominaSettingsState {
  const [tab, setTab] = useState<NominaSettingsTab>("modelo");
  const [minShows, setMinShows] = useState<number | null>(savedMin);
  const [links, setLinks] = useState(() => buildSocialDraft(socials));
  const [error, setError] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const split = useNominaSplitModel(savedSplit, artist.nomina, minShows ?? 0);

  const setLink = (network: NominaSocialNetwork, url: string) => setLinks((current) => ({ ...current, [network]: url }));
  const hasInvalidLink = SOCIAL_NETWORKS.some(({ key, domains }) => checkSocialUrl(links[key], domains) === "invalid");

  const submit = () => {
    setError(null);
    startSaving(async () => {
      const result = tab === "modelo"
        ? await saveNominaArtistConfigAction({ clientId: artist.id, minShows: minShows ?? 0, split: split.settings })
        : await saveNominaArtistSocialsAction({ clientId: artist.id, socials: SOCIAL_NETWORKS.map(({ key }) => ({ network: key, url: links[key].trim() || undefined })) });
      if (!result.ok) return setError(result.message);
      onClose();
    });
  };

  return {
    tab,
    setTab,
    minShows,
    setMinShows,
    split,
    links,
    setLink,
    canSave: !isSaving && !hasInvalidLink && (tab === "redes" || (split.isViable && minShows !== null && minShows >= 1)),
    isSaving,
    error,
    submit,
  };
}
