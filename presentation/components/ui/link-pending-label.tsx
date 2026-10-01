"use client";

import { useLinkStatus } from "next/link";
import type { LinkPendingLabelProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Texto de un enlace que late mientras la navegación que dispara está en
 * curso: confirma el clic cuando la página tarda en responder.
 */
export function LinkPendingLabel({ children }: LinkPendingLabelProps) {
  const { pending } = useLinkStatus();

  return <span className={cn(pending && "animate-pulse opacity-60")}>{children}</span>;
}
