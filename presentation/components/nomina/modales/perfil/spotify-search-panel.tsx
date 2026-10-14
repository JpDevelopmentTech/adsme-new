import { SETTINGS_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import type { SpotifySearchPanelProps } from "@/types/nomina-modales-perfil.types";

/** Panel «Buscar en Spotify»: sin conector avisa y deja pegar el enlace del perfil. */
export function SpotifySearchPanel({ value, onChange }: SpotifySearchPanelProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-surface p-3.5">
      <FieldMessage tone="danger">{SETTINGS_MODAL_COPY.spotifyDisconnected}</FieldMessage>
      <label htmlFor="settings-spotify-paste" className="text-xs font-light text-text-secondary">
        {SETTINGS_MODAL_COPY.spotifyPasteLead}
      </label>
      <TextInput id="settings-spotify-paste" type="url" value={value} placeholder={SETTINGS_MODAL_COPY.spotifyPastePlaceholder} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
