/**
 * Estilos de los botones del diseño, compartidos por los `<button>` y los `<a>`.
 * El primario va en tinta: destaca por contraste, no por color, y deja el rojo
 * libre para los errores.
 */
export const PRIMARY_BUTTON_CLASSES = [
  // Tailwind v4 ya no pone `cursor: pointer` en los botones: sin esto parecen
  // inertes y el usuario duda de si se pueden pulsar.
  "flex cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-[15px] py-[10px]",
  "text-[12.5px] font-normal whitespace-nowrap text-white transition-colors duration-150",
  "hover:bg-g-700 focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const SECONDARY_BUTTON_CLASSES = [
  "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-[15px] py-[10px]",
  "text-[12.5px] font-normal whitespace-nowrap text-text-primary transition-colors duration-150",
  "hover:border-border-strong hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");
