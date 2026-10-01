import type { EmptyStatePanelProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Estado vacío del sistema: un icono en un cuadro de vidrio con halo lila, el
 * título, una frase que orienta y la acción que da la salida.
 */
export function EmptyStatePanel({
  icon,
  title,
  description,
  action,
  isStandalone = false,
}: EmptyStatePanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[18px] px-9 py-12 text-center",
        isStandalone && "glass-thick flex-1 justify-center rounded-card",
      )}
    >
      <span className="grid size-[84px] place-items-center rounded-pill bg-[radial-gradient(closest-side,#8a4fff66,#8a4fff00)]">
        <span className="grid size-14 place-items-center rounded-[18px] border border-border-strong bg-surface text-text-primary">
          {icon}
        </span>
      </span>

      <div className="flex max-w-[440px] flex-col gap-2">
        <p className="text-xl font-light text-text-primary">{title}</p>
        <p className="text-sm leading-[1.5] text-text-secondary">{description}</p>
      </div>

      {action}
    </div>
  );
}
