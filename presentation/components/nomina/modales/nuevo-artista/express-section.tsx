import { EXPRESS_REFERENCE_NOMINA } from "@/constants/nomina-modales.constants";
import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { SwitchControl } from "@/presentation/components/nomina/modales/campos/switch-control";
import { DistributionPanel } from "@/presentation/components/nomina/modales/ingreso/distribution-panel";
import { ExpressDetail } from "@/presentation/components/nomina/modales/nuevo-artista/express-detail";
import type { NewArtistSectionProps } from "@/types/nomina-modales-artista.types";
import { listYearMonths } from "@/utils/list-year-months";
import { buildIncomeSplit } from "@/utils/build-income-split";
import { resolveSplitModel } from "@/utils/resolve-split-model";
import { suggestMinShows } from "@/utils/suggest-min-shows";

/** «¿Aplica Express?» y, si aplica, su detalle con la distribución calculada. */
export function ExpressSection({ form }: NewArtistSectionProps) {
  const { express, split } = form;
  const year = Number(form.startDate.slice(0, 4));
  const model = split.model ?? resolveSplitModel(split.settings, EXPRESS_REFERENCE_NOMINA, suggestMinShows(EXPRESS_REFERENCE_NOMINA) ?? 1);
  const distribution =
    express.amount > 0 ? (
      <DistributionPanel
        idPrefix="new-artist-express-split"
        amount={express.amount}
        split={buildIncomeSplit({ concept: "express", amount: express.amount, cost: 0, model, monthBilled: 0 })}
        note={split.model ? undefined : NEW_ARTIST_COPY.expressReference}
      />
    ) : null;

  return (
    <div className="flex flex-col gap-4">
      <SwitchControl
        id="new-artist-express-switch"
        label={NEW_ARTIST_COPY.express}
        isChecked={express.isOn}
        onChange={express.setIsOn}
        onLabel={NEW_ARTIST_COPY.expressOn}
        offLabel={NEW_ARTIST_COPY.expressOff}
      />
      {express.isOn ? <ExpressDetail express={express} distribution={distribution} monthOptions={listYearMonths([year, year + 1])} /> : null}
    </div>
  );
}
