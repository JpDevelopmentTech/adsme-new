"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { ButtonProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/** Botón de confirmación destructiva; refleja el estado del formulario que lo contiene. */
export function DangerButton({ children, className, ...buttonProps }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-pill bg-danger px-5 py-2.5",
        "text-[13px] font-semibold whitespace-nowrap text-white transition-opacity",
        "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...buttonProps}
    >
      {pending ? <Loader2 size={15} className="animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
