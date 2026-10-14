import type { MiniStatProps } from "@/types/nomina-ui.types";

/** Indicador compacto: rótulo, valor y una aclaración debajo. */
export function MiniStat({ label, value, sub }: MiniStatProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-md border border-border bg-surface px-4 py-3.5">
      <p className="text-[11px] font-normal text-text-muted">{label}</p>
      <p className="truncate text-lg font-light text-text-primary tabular-nums">{value}</p>
      {sub ? <p className="text-[11px] text-text-muted">{sub}</p> : null}
    </div>
  );
}
