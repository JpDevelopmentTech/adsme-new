import { INCOME_SPLIT_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { SplitParamsFields } from "@/presentation/components/nomina/modales/reparto/split-params-fields";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";
import { cn } from "@/utils/cn";

/** Caja «Parámetros del reparto de esta transacción», con vuelta a los del artista. */
export function TransactionParamsBox({ form, artist }: IncomeSectionProps) {
  const params = form.values.params ?? form.artistParams;
  const isCustom =
    params.profitPercent !== form.artistParams.profitPercent || params.profitPerShowAfterMin !== form.artistParams.profitPerShowAfterMin;

  return (
    <section className={cn("flex flex-col gap-3 rounded-card border bg-surface p-4", isCustom ? "border-lilac/60" : "border-border")}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-light text-text-primary">{INCOME_SPLIT_COPY.paramsTitle}</h3>
        {isCustom ? (
          <button type="button" onClick={() => form.setSplitInput({ params: null })} className="cursor-pointer rounded-sm text-xs font-light text-lilac hover:underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
            {INCOME_SPLIT_COPY.paramsReset}
          </button>
        ) : (
          <span className="text-xs font-light text-text-muted">{INCOME_SPLIT_COPY.paramsArtist}</span>
        )}
      </div>
      <SplitParamsFields
        idPrefix="income-params"
        hasScalability={form.hasScalability}
        percent={params.profitPercent}
        post={params.profitPerShowAfterMin}
        nomina={artist.nomina}
        onPercent={(profitPercent) => form.setSplitInput({ params: { ...params, profitPercent } })}
        onPost={(profitPerShowAfterMin) => form.setSplitInput({ params: { ...params, profitPerShowAfterMin } })}
      />
      <p className="text-xs leading-[1.45] font-light text-text-muted">{INCOME_SPLIT_COPY.paramsHelp}</p>
    </section>
  );
}
