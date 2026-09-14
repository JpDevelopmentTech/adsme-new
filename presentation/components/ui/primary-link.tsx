import Link from "next/link";
import type { SecondaryLinkProps } from "@/types/ui.types";
import { PRIMARY_BUTTON_CLASSES } from "@/utils/button-styles";
import { cn } from "@/utils/cn";

/** Enlace con la apariencia del botón primario, para acciones que navegan. */
export function PrimaryLink({ href, children, className }: SecondaryLinkProps) {
  return (
    <Link href={href} className={cn(PRIMARY_BUTTON_CLASSES, className)}>
      {children}
    </Link>
  );
}
