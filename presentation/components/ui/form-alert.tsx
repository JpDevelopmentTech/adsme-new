import { AlertCircle, TriangleAlert } from "lucide-react";
import type { FormAlertProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

const TONE_CLASSES = {
  danger: "border-danger/40 bg-danger/10 text-danger",
  warning: "border-warning/40 bg-warning/10 text-warning",
};

/** El círculo dice «algo falló»; el triángulo, «esto todavía te falta». */
const TONE_ICONS = { danger: AlertCircle, warning: TriangleAlert };

export function FormAlert({ message, tone = "danger" }: FormAlertProps) {
  const Icon = TONE_ICONS[tone];

  return (
    <p
      role="alert"
      className={cn(
        "flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[13px]",
        TONE_CLASSES[tone],
      )}
    >
      <Icon size={16} strokeWidth={1.75} className="mt-px shrink-0" aria-hidden />
      {message}
    </p>
  );
}
