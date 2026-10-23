"use client";

import type { ChargeSwitchProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Interruptor controlado y compacto (`role="switch"`) para «Cobrar» el servicio. */
export function ChargeSwitch({ label, isOn, onChange }: ChargeSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={() => onChange(!isOn)}
      className="flex min-h-10 cursor-pointer items-center gap-2 rounded-pill px-1 text-[13px] text-text-secondary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      {label}
      <span className={cn("flex h-6 w-[42px] items-center rounded-pill border p-[2px] transition-colors", isOn ? "border-transparent bg-ink" : "border-white/25 bg-surface")}>
        <span className={cn("size-[18px] rounded-full transition-transform duration-150 motion-reduce:transition-none", isOn ? "translate-x-[18px] bg-g-50" : "bg-text-muted")} />
      </span>
    </button>
  );
}
