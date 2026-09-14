import Link from "next/link";
import type { SecondaryLinkProps } from "@/types/ui.types";
import { SECONDARY_BUTTON_CLASSES } from "@/utils/button-styles";
import { cn } from "@/utils/cn";

/** Enlace con la apariencia del botón secundario, para acciones que navegan. */
export function SecondaryLink({
  href,
  children,
  className,
}: SecondaryLinkProps) {
  return (
    <Link href={href} className={cn(SECONDARY_BUTTON_CLASSES, className)}>
      {children}
    </Link>
  );
}
