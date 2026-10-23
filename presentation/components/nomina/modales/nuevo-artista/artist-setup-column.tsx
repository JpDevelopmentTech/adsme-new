import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { DateInput } from "@/presentation/components/nomina/modales/campos/date-input";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { ArtistNominaFields } from "@/presentation/components/nomina/modales/nuevo-artista/artist-nomina-fields";
import { InitialStateNote } from "@/presentation/components/nomina/modales/nuevo-artista/initial-state-note";
import { SelectedClientCard } from "@/presentation/components/nomina/modales/nuevo-artista/selected-client-card";
import type { ArtistSetupColumnProps } from "@/types/nomina-modales-artista.types";

/** Columna izquierda del alta: el cliente elegido, su nómina, la vigencia y el estado inicial. */
export function ArtistSetupColumn({ form, canChangeClient }: ArtistSetupColumnProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      {form.client ? <SelectedClientCard client={form.client} onChange={canChangeClient ? () => form.setClient(null) : undefined} /> : null}
      <ArtistNominaFields form={form} />
      <FieldShell htmlFor="new-artist-start" label={NEW_ARTIST_COPY.startDate} hint={NEW_ARTIST_COPY.startDateHelp}>
        <DateInput id="new-artist-start" value={form.startDate} onChange={form.setStartDate} />
      </FieldShell>
      <InitialStateNote />
    </div>
  );
}
