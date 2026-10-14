import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import type { ClientChipProps } from "@/types/nomina-modales-ingreso.types";

/** «Cliente»: el artista preseleccionado, no editable. */
export function ClientChip({ artist }: ClientChipProps) {
  return (
    <FieldShell label={INCOME_MODAL_COPY.client} hint={INCOME_MODAL_COPY.clientHelp}>
      <span className="flex w-fit items-center gap-2.5 rounded-pill border border-lilac/30 bg-lilac/14 py-1.5 pr-4 pl-1.5 text-sm font-normal text-text-primary">
        <ArtistAvatar name={artist.name} photoUrl={artist.photoUrl} size={28} />
        {artist.name}
      </span>
    </FieldShell>
  );
}
