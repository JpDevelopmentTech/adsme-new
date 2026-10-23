"use client";

import type { QuoteTextareaProps } from "@/types/quote-platforms.types";

/** Área de texto del cotizador con su rótulo encima y el alto en filas. */
export function QuoteTextarea({ id, label, value, rows, placeholder, onChange }: QuoteTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="glass-field w-full resize-y rounded-md px-3.5 py-3 text-sm leading-[1.45] text-text-primary outline-none placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
      />
    </div>
  );
}
