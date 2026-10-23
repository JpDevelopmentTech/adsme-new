import type { FinanceEmptyNoteProps } from "@/types/nomina-finanzas-props.types";

/** Estado vacío compacto dentro de un panel de Finanzas: título y, si hace falta, cómo salir de él. */
export function FinanceEmptyNote({ title, text }: FinanceEmptyNoteProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-3 py-8 text-center">
      <p className="text-sm text-text-primary">{title}</p>
      {text ? <p className="text-[13px] text-text-muted">{text}</p> : null}
    </div>
  );
}
