import { EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { SelectInput } from "@/presentation/components/nomina/modales/campos/select-input";
import type { ExpressDetailProps } from "@/types/nomina-modales-artista.types";

/** Caja «Detalle del Express»: monto de entrada, distribución y mes que cubre. */
export function ExpressDetail({ express, distribution, monthOptions }: ExpressDetailProps) {
  const presetOptions = [...EXPRESS_PRESETS.map(({ value, label }) => ({ value, label })), { value: EXPRESS_OTHER, label: NEW_ARTIST_COPY.expressOther }];

  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-surface p-4">
      <p className="text-sm font-light text-text-primary">{NEW_ARTIST_COPY.expressDetail}</p>
      <FieldShell htmlFor="new-artist-express" label={NEW_ARTIST_COPY.expressAmount} hint={NEW_ARTIST_COPY.expressHelp}>
        <SelectInput id="new-artist-express" value={express.preset} options={presetOptions} onChange={express.setPreset} hasIcon={false} />
      </FieldShell>
      {express.preset === EXPRESS_OTHER ? (
        <MoneyInput
          id="new-artist-express-other"
          ariaLabel={NEW_ARTIST_COPY.expressOther}
          value={express.otherAmount}
          onChange={express.setOtherAmount}
          placeholder={NEW_ARTIST_COPY.expressOtherPlaceholder}
        />
      ) : null}
      {distribution}
      <FieldShell
        htmlFor="new-artist-covered"
        label={NEW_ARTIST_COPY.coveredMonth}
        hint={express.coveredMonth ? NEW_ARTIST_COPY.coveredMonthHelp : NEW_ARTIST_COPY.coveredMonthEmpty}
      >
        <SelectInput
          id="new-artist-covered"
          value={express.coveredMonth}
          options={monthOptions}
          onChange={express.setCoveredMonth}
          placeholder={NEW_ARTIST_COPY.monthPlaceholder}
        />
      </FieldShell>
    </div>
  );
}
