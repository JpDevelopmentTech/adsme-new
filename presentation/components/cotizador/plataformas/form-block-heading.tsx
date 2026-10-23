import type { FormBlockHeadingProps } from "@/types/quote-platforms.types";

/** Título y frase guía de un bloque del formulario. */
export function FormBlockHeading({ id, title, subtitle }: FormBlockHeadingProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 id={id} className="text-lg font-light text-text-primary">{title}</h2>
      <p className="text-[13px] leading-[1.5] text-text-secondary">{subtitle}</p>
    </div>
  );
}
