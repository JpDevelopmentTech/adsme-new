import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { ShowRuler } from "@/presentation/components/nomina/show-ruler";
import type { ScalabilityKpiCardProps } from "@/types/nomina-perfil.types";

/** Tarjeta «Escalabilidad»: shows del mes frente al mínimo y la regla de shows. */
export function ScalabilityKpiCard({ progress }: ScalabilityKpiCardProps) {
  const percent = progress.minShows > 0 ? Math.min(100, Math.round((progress.shows / progress.minShows) * 100)) : 0;

  return (
    <section className="glass-panel flex min-w-0 flex-col gap-3 rounded-card px-5 py-[18px]">
      <h3 className="text-[13px] font-light text-text-secondary">{PROFILE_COPY.scalability}</h3>
      <p className="flex items-baseline gap-1.5">
        <span className="text-[26px] leading-tight font-extralight text-text-primary tabular-nums">{progress.shows}</span>
        <span className="text-xs text-text-muted tabular-nums">
          /{progress.minShows} shows · {percent}%
        </span>
      </p>
      <ShowRuler progress={progress} size="md" />
    </section>
  );
}
