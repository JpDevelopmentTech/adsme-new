import { Loader2 } from "lucide-react";
import type { ButtonProps } from "@/types/ui.types";
import { PRIMARY_BUTTON_CLASSES } from "@/utils/button-styles";
import { cn } from "@/utils/cn";

export function PrimaryButton({
  isLoading = false,
  children,
  className,
  disabled,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(PRIMARY_BUTTON_CLASSES, className)}
      {...buttonProps}
    >
      {isLoading ? <Loader2 size={18} className="animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
