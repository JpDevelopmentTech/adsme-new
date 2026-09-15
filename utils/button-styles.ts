/**
 * Estilos de los botones del diseño, compartidos por los `<button>` y los `<a>`.
 * El primario lleva el rojo de marca: es la única acción de la pantalla que se
 * señala con color.
 */
export const PRIMARY_BUTTON_CLASSES = [
  // Tailwind v4 ya no pone `cursor: pointer` en los botones: sin esto parecen
  // inertes y el usuario duda de si se pueden pulsar.
  "flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-[15px] py-[10px] shadow-float",
  "text-[12.5px] font-medium whitespace-nowrap text-g-50 transition-all duration-150",
  "hover:-translate-y-px hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:translate-none disabled:opacity-60 disabled:shadow-none",
].join(" ");

export const SECONDARY_BUTTON_CLASSES = [
  "glass-field flex cursor-pointer items-center justify-center gap-2 rounded-md px-[15px] py-[10px]",
  "text-[12.5px] font-normal whitespace-nowrap text-text-primary transition-colors duration-150",
  "hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");
