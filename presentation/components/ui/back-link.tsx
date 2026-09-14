import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { BackLinkProps } from "@/types/ui.types";

/** Enlace de vuelta que encabeza las pantallas de detalle y asistentes. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="flex w-fit items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
    >
      <ArrowLeft size={15} aria-hidden />
      {label}
    </Link>
  );
}
