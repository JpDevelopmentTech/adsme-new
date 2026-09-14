import { ChevronDown } from "lucide-react";
import type { FilterChipProps } from "@/types/ui.types";

export function FilterChip({ label, icon }: FilterChipProps) {
  return (
    <button
      type="button"
      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-pill border border-border bg-card px-3.5 py-[9px] transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
    >
      <span className="text-[13px] font-medium text-text-secondary">{label}</span>
      {icon ?? <ChevronDown size={15} className="text-text-muted" aria-hidden />}
    </button>
  );
}
