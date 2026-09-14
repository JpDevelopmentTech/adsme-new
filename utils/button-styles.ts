/** Estilos de los botones del diseño, compartidos por los `<button>` y los `<a>`. */
export const PRIMARY_BUTTON_CLASSES = [
  // Tailwind v4 ya no pone `cursor: pointer` en los botones: sin esto parecen
  // inertes y el usuario duda de si se pueden pulsar.
  "flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-brand-gradient px-[22px] py-[13px]",
  "text-sm font-semibold whitespace-nowrap text-white transition-opacity",
  "hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const SECONDARY_BUTTON_CLASSES = [
  "flex cursor-pointer items-center justify-center gap-2 rounded-pill border border-border-strong px-[22px] py-[13px]",
  "text-sm font-semibold whitespace-nowrap text-text-primary transition-colors",
  "hover:border-brand-violet/60 hover:bg-card focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");
