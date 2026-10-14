import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import { ArtistPhotoHelp } from "@/presentation/components/nomina/modales/nuevo-artista/artist-photo-help";
import { ArtistPhotoPicker } from "@/presentation/components/nomina/modales/nuevo-artista/artist-photo-picker";
import type { NewArtistSectionProps } from "@/types/nomina-modales-artista.types";

/** «Nombre del artista» con el círculo de la foto y su ayuda. */
export function ArtistNameField({ form }: NewArtistSectionProps) {
  return (
    <div className="flex flex-col gap-2">
    <FieldShell htmlFor="new-artist-name" label={NEW_ARTIST_COPY.name} error={form.isDuplicate ? NEW_ARTIST_COPY.duplicate : null}>
      <div className="flex items-center gap-3">
        <ArtistPhotoPicker photo={form.photo} />
        <div className="flex-1">
          <TextInput
            id="new-artist-name"
            value={form.name}
            placeholder={NEW_ARTIST_COPY.namePlaceholder}
            autoComplete="off"
            isInvalid={form.isDuplicate}
            onChange={(event) => form.setName(event.target.value)}
          />
        </div>
      </div>
    </FieldShell>
      <ArtistPhotoHelp photo={form.photo} />
    </div>
  );
}
