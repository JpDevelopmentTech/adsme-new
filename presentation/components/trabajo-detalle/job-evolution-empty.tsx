import { ChartSpline } from "lucide-react";
import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";

/** Líneas horizontales de la rejilla vacía, para que se lea como una gráfica. */
const GRID_LINES = [0, 1, 2];

/** Hueco de la gráfica cuando ninguna campaña registró reproducciones en la ventana. */
export function JobEvolutionEmpty() {
  return (
    <div className="relative flex min-h-[190px] items-center justify-center">
      <div aria-hidden className="absolute inset-0 flex flex-col justify-between py-5">
        {GRID_LINES.map((line) => (
          <span key={line} className="h-px bg-white/[0.06]" />
        ))}
      </div>

      <div className="relative flex max-w-[520px] flex-col items-center gap-2.5 bg-card-thick px-4 text-center">
        <span className="grid size-11 place-items-center rounded-[14px] border border-border-strong bg-surface">
          <ChartSpline size={20} strokeWidth={1.5} className="text-text-secondary" aria-hidden />
        </span>
        <p className="text-[13px] leading-[1.5] font-normal text-text-secondary">{JOB_DETAIL_COPY.evolutionEmpty}</p>
      </div>
    </div>
  );
}
