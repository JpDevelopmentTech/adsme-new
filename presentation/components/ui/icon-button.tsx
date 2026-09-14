import type { IconButtonProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

export function IconButton({
  icon,
  label,
  size = 40,
  className,
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      style={{ width: size, height: size }}
      className={cn(
        "grid shrink-0 cursor-pointer place-items-center rounded-md border border-border bg-card text-text-secondary transition-colors",
        "hover:border-border-strong hover:text-text-primary focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-border disabled:hover:text-text-secondary",
        className,
      )}
      {...buttonProps}
    >
      {icon}
    </button>
  );
}
