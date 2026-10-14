import { ARTIST_PHOTO_COPY } from "@/constants/nomina-modales-copy.constants";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import type { ArtistPhotoHelpProps } from "@/types/nomina-modales-artista.types";

/** Ayuda de la foto, con «Quitar foto» si ya hay una y el error si el archivo no sirve. */
export function ArtistPhotoHelp({ photo }: ArtistPhotoHelpProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {photo.error ? <FieldMessage tone="danger">{photo.error}</FieldMessage> : null}
      <p className="text-xs leading-[1.5] font-light text-text-muted">
        {ARTIST_PHOTO_COPY.help}{" "}
        {photo.url ? (
          <button type="button" onClick={photo.remove} className="cursor-pointer text-text-secondary underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
            {ARTIST_PHOTO_COPY.remove}
          </button>
        ) : null}
      </p>
    </div>
  );
}
