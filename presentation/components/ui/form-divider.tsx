import type { FormDividerProps } from "@/types/ui.types";

export function FormDivider({ label }: FormDividerProps) {
  return (
    <div className="flex w-full items-center gap-3.5">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-text-muted">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
