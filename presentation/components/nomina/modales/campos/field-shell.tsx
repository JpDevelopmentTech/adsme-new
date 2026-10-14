import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import type { FieldShellProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";

/**
 * Armazón de un campo: etiqueta (con aclaración y acción opcionales), control
 * y debajo el error, el aviso o la ayuda, en ese orden de prioridad.
 */
export function FieldShell({ htmlFor, label, labelIcon, labelExtra, labelAction, hint, error, warning, className, children }: FieldShellProps) {
  const Label = htmlFor ? "label" : "span";

  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor} className="flex items-center gap-2 text-[13px] font-light text-text-primary">
          {labelIcon}
          <span>
            {label}
            {labelExtra ? <span className="text-text-secondary"> {labelExtra}</span> : null}
          </span>
        </Label>
        {labelAction}
      </div>
      {children}
      {error ? <FieldMessage tone="danger">{error}</FieldMessage> : null}
      {!error && warning ? <FieldMessage tone="warning">{warning}</FieldMessage> : null}
      {!error && hint ? <div className="text-xs leading-[1.45] font-light text-text-muted">{hint}</div> : null}
    </div>
  );
}
