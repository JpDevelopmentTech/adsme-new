"use client";

import { ChevronDown } from "lucide-react";
import type { AgeSelectProps } from "@/types/quote-campaign.types";

/** Edad límite del público; la opción vacía lleva el nombre del campo («Desde», «Hasta»). */
export function AgeSelect({ label, value, ages, onChange }: AgeSelectProps) {
  return (
    <span className="glass-field relative flex h-10 min-w-0 flex-1 items-center rounded-pill transition-colors focus-within:border-white/40 focus-within:ring-2 focus-within:ring-lilac">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full cursor-pointer appearance-none bg-transparent pr-9 pl-3.5 text-[13px] text-text-primary tabular-nums outline-none [&_option]:bg-[#140c26] [&_option]:text-text-primary"
      >
        <option value="">{label}</option>
        {ages.map((age) => <option key={age} value={age}>{age}</option>)}
      </select>
      <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3 text-text-muted" />
    </span>
  );
}
