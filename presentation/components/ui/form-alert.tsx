import { AlertCircle } from "lucide-react";
import type { FormAlertProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

const TONE_CLASSES = {
  danger: "border-danger/40 bg-danger/10 text-danger",
  warning: "border-warning/40 bg-warning/10 text-warning",
};

export function FormAlert({ message, tone = "danger" }: FormAlertProps) {
  return (
    <p
      role="alert"
      className={cn(
        "flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[13px]",
        TONE_CLASSES[tone],
      )}
    >
      <AlertCircle size={16} className="mt-px shrink-0" aria-hidden />
      {message}
    </p>
  );
}
