import { Loader2 } from "lucide-react";
import type { IconButtonLikeProps } from "@/types/ui.types";
import { SECONDARY_BUTTON_CLASSES } from "@/utils/button-styles";
import { cn } from "@/utils/cn";

export function SecondaryButton({
  icon,
  isLoading = false,
  children,
  className,
  disabled,
  ...buttonProps
}: IconButtonLikeProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(SECONDARY_BUTTON_CLASSES, className)}
      {...buttonProps}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" aria-hidden />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
