import type { KpiTileProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";

/** Tarjeta de cifra de contexto: icono arriba, la cifra en peso fino abajo. */
export function KpiTile({ icon: Icon, label, value, note, isFlagged = false }: KpiTileProps) {
  return (
    <section className="glass-panel flex min-w-0 flex-1 flex-col justify-between gap-6 rounded-card p-[22px]">
      <div className="flex flex-col gap-3.5">
        <span className="grid size-[38px] place-items-center rounded-[12px] border border-border bg-surface">
          <Icon size={18} strokeWidth={1.5} className="text-text-primary" aria-hidden />
        </span>
        <h2 className="text-xs font-normal text-text-muted">{label}</h2>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-4xl leading-[1.1] font-extralight text-text-primary tabular-nums">
          {value}
        </p>
        <p className="flex items-center gap-1.5">
          {isFlagged ? (
            <span aria-hidden className="size-1.5 shrink-0 rounded-pill bg-danger" />
          ) : null}
          <span
            className={cn(
              "text-xs font-normal",
              isFlagged ? "text-text-secondary" : "text-text-muted",
            )}
          >
            {note}
          </span>
        </p>
      </div>
    </section>
  );
}
