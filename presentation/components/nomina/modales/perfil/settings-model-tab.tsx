import { SETTINGS_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import { SplitModelEditor } from "@/presentation/components/nomina/modales/reparto/split-model-editor";
import type { SettingsTabPanelProps } from "@/types/nomina-modales-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Pestaña «Modelo de reparto»: nómina, Mínimo de Shows y el bloque del modelo. */
export function SettingsModelTab({ settings, artist }: SettingsTabPanelProps) {
  const { minShows, split } = settings;
  const threshold = minShows && minShows > 0 ? formatExactCurrency(minShows * artist.nomina) : "—";

  return (
    <div id="settings-panel-modelo" role="tabpanel" aria-labelledby="settings-tab-modelo" className="flex flex-col gap-6">
      <p className="text-sm leading-[1.5] font-light text-text-secondary">{SETTINGS_MODAL_COPY.nominaNote(formatExactCurrency(artist.nomina))}</p>
      <FieldShell htmlFor="settings-min" label={SETTINGS_MODAL_COPY.minShows} hint={SETTINGS_MODAL_COPY.minShowsHelp(threshold)}>
        <TextInput
          id="settings-min"
          type="number"
          min={1}
          inputMode="numeric"
          value={minShows ?? ""}
          isInvalid={minShows === null || minShows < 1}
          onChange={(event) => settings.setMinShows(event.target.value === "" ? null : Math.max(0, Math.trunc(Number(event.target.value))))}
        />
      </FieldShell>
      <SplitModelEditor idPrefix="settings" settings={split.settings} model={split.model} viability={split.viability} onChange={split.update} />
    </div>
  );
}
