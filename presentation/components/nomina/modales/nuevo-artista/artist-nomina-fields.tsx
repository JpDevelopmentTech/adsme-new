import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import type { NewArtistSectionProps } from "@/types/nomina-modales-artista.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** «Nómina (COP)», «Mínimo de Shows» (sugerido por tramo) y el umbral automático. */
export function ArtistNominaFields({ form }: NewArtistSectionProps) {
  const { suggestedMin, minShows } = form;
  const isDeviating = suggestedMin !== null && minShows !== null && minShows !== suggestedMin;

  return (
    <div className="flex flex-col gap-5">
      <FieldShell htmlFor="new-artist-nomina" label={NEW_ARTIST_COPY.nomina} hint={NEW_ARTIST_COPY.nominaHelp} error={form.nominaError}>
        <MoneyInput id="new-artist-nomina" value={form.nomina} onChange={form.setNomina} placeholder={NEW_ARTIST_COPY.nominaPlaceholder} isInvalid={form.nominaError !== null} />
      </FieldShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell
          htmlFor="new-artist-min"
          label={NEW_ARTIST_COPY.minShows}
          hint={suggestedMin === null ? NEW_ARTIST_COPY.minShowsAuto : NEW_ARTIST_COPY.minShowsSuggested(suggestedMin)}
          warning={isDeviating ? NEW_ARTIST_COPY.minShowsDeviation(suggestedMin) : null}
        >
          <TextInput
            id="new-artist-min"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="—"
            disabled={suggestedMin === null}
            value={minShows ?? ""}
            onChange={(event) => form.setMinShows(event.target.value === "" ? null : Math.max(0, Math.trunc(Number(event.target.value))))}
          />
        </FieldShell>
        <FieldShell htmlFor="new-artist-threshold" label={NEW_ARTIST_COPY.threshold} hint={NEW_ARTIST_COPY.thresholdHelp}>
          <TextInput id="new-artist-threshold" disabled placeholder="—" value={form.threshold === null ? "" : formatExactCurrency(form.threshold)} readOnly />
        </FieldShell>
      </div>
    </div>
  );
}
