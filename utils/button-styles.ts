/**
 * Estilos de los botones del diseño, compartidos por los `<button>` y los `<a>`.
 * El primario es una píldora blanca con texto en tinta, como el logotipo:
 * destaca por contraste y deja los colores para las plataformas y los estados.
 */
export const PRIMARY_BUTTON_CLASSES = [
  // Tailwind v4 ya no pone `cursor: pointer` en los botones: sin esto parecen
  // inertes y el usuario duda de si se pueden pulsar.
  "flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-ink px-5 py-[11px]",
  "text-sm font-normal whitespace-nowrap text-g-50 transition-colors duration-150",
  "hover:bg-g-700 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const SECONDARY_BUTTON_CLASSES = [
  "flex cursor-pointer items-center justify-center gap-2 rounded-pill border border-border-strong bg-surface px-[18px] py-[10px]",
  "text-sm font-normal whitespace-nowrap text-text-primary transition-colors duration-150",
  "hover:bg-g-100 hover:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");
