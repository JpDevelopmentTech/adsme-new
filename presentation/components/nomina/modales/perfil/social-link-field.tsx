"use client";

import { useState } from "react";
import { SOCIAL_EMPTY_COLOR } from "@/constants/nomina-modales-redes.constants";
import { SETTINGS_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import { SocialNetworkIcon } from "@/presentation/components/nomina/modales/perfil/social-network-icon";
import { SpotifySearchPanel } from "@/presentation/components/nomina/modales/perfil/spotify-search-panel";
import type { SocialLinkFieldProps } from "@/types/nomina-modales-perfil.types";
import { checkSocialUrl } from "@/utils/check-social-url";

/** Enlace de una red con su logo (a color si tiene valor) y su validación. */
export function SocialLinkField({ meta, value, onChange }: SocialLinkFieldProps) {
  const [isSearching, setIsSearching] = useState(false);
  const check = checkSocialUrl(value, meta.domains);
  const id = `settings-link-${meta.key}`;
  const searchToggle =
    meta.key === "spotify" ? (
      <button type="button" aria-expanded={isSearching} onClick={() => setIsSearching((open) => !open)} className="cursor-pointer rounded-sm text-xs font-light text-lilac hover:underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
        {isSearching ? SETTINGS_MODAL_COPY.closeSearch : SETTINGS_MODAL_COPY.searchSpotify}
      </button>
    ) : null;

  return (
    <div className="flex flex-col gap-2">
      <FieldShell
        htmlFor={id}
        label={meta.label}
        labelIcon={<SocialNetworkIcon network={meta.key} color={value ? meta.color : SOCIAL_EMPTY_COLOR} />}
        labelAction={searchToggle}
        error={check === "invalid" ? SETTINGS_MODAL_COPY.invalidLink : null}
        warning={check === "foreign" ? SETTINGS_MODAL_COPY.foreignLink(meta.label) : null}
      >
        <TextInput id={id} type="url" value={value} placeholder={meta.placeholder} isInvalid={check === "invalid"} onChange={(event) => onChange(event.target.value)} />
      </FieldShell>
      {isSearching ? <SpotifySearchPanel value={value} onChange={onChange} /> : null}
    </div>
  );
}
