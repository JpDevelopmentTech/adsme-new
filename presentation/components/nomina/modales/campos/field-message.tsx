import { AlertTriangle } from "lucide-react";
import type { FieldMessageProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";

/** Error (rojo) o aviso (ámbar) bajo un campo, con icono para no depender del color. */
export function FieldMessage({ tone, children }: FieldMessageProps) {
  return (
    <p role={tone === "danger" ? "alert" : undefined} className={cn("flex items-start gap-1.5 text-xs font-light", tone === "danger" ? "text-danger" : "text-warning")}>
      <AlertTriangle size={13} strokeWidth={1.75} className="mt-px shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
