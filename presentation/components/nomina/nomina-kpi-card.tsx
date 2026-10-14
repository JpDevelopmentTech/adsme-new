import type { NominaKpiCardProps } from "@/types/nomina-ui.types";
import { cn } from "@/utils/cn";

/** Tarjeta de cifra: icono opcional, rótulo, la cifra en peso fino y una nota. */
export function NominaKpiCard({ label, value, icon: Icon, iconColor, note, valueClassName, children }: NominaKpiCardProps) {
  return (
    <section className="glass-panel flex min-w-0 flex-1 flex-col gap-3 rounded-card px-5 py-[18px]">
      {Icon ? (
        <span className="grid size-[34px] place-items-center rounded-[11px] border border-border bg-surface">
          <Icon size={16} strokeWidth={1.5} style={{ color: iconColor }} aria-hidden />
        </span>
      ) : null}
      <h3 className="text-[13px] font-light text-text-secondary">{label}</h3>
      <p className={cn("text-[26px] leading-tight font-extralight tracking-[-0.5px] text-text-primary tabular-nums", valueClassName)}>
        {value}
      </p>
      {note ? <p className="text-[11px] leading-[1.35] text-text-muted">{note}</p> : null}
      {children}
    </section>
  );
}
