import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { DateInput } from "@/presentation/components/nomina/modales/campos/date-input";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { ArtistNameField } from "@/presentation/components/nomina/modales/nuevo-artista/artist-name-field";
import { ArtistNominaFields } from "@/presentation/components/nomina/modales/nuevo-artista/artist-nomina-fields";
import { ExpressSection } from "@/presentation/components/nomina/modales/nuevo-artista/express-section";
import { InitialStateNote } from "@/presentation/components/nomina/modales/nuevo-artista/initial-state-note";
import type { NewArtistSectionProps } from "@/types/nomina-modales-artista.types";

/** Columna izquierda del alta: identidad, nómina, Express, vigencia y estado inicial. */
export function ArtistSetupColumn({ form }: NewArtistSectionProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <ArtistNameField form={form} />
      <ArtistNominaFields form={form} />
      <ExpressSection form={form} />
      <FieldShell htmlFor="new-artist-start" label={NEW_ARTIST_COPY.startDate} hint={NEW_ARTIST_COPY.startDateHelp}>
        <DateInput id="new-artist-start" value={form.startDate} onChange={form.setStartDate} />
      </FieldShell>
      <InitialStateNote />
    </div>
  );
}
