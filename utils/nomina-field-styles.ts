/** Caja de los campos de los modales de la nómina: carbón translúcido, radio 14. */
export const NOMINA_FIELD_BOX = [
  "flex min-h-[48px] w-full items-center gap-2.5 rounded-md border bg-card-elevated px-3.5 transition-colors",
  "focus-within:border-white/40 focus-within:ring-2 focus-within:ring-lilac/60",
].join(" ");

/** Borde del campo según su estado. */
export const NOMINA_FIELD_TONE = {
  normal: "border-border",
  invalid: "border-danger bg-danger/8",
  warning: "border-warning",
  disabled: "border-border opacity-60",
} as const;

/** El `<input>` dentro de la caja. */
export const NOMINA_FIELD_INPUT =
  "min-w-0 flex-1 bg-transparent py-3 text-base text-text-primary outline-none placeholder:text-text-muted disabled:cursor-not-allowed sm:text-sm";
