import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { BreadcrumbProps } from "@/types/ui.types";

/** Migas de dos niveles: vuelta a la sección y el nombre de la pantalla actual. */
export function Breadcrumb({ backHref, backLabel, current }: BreadcrumbProps) {
  return (
    <nav aria-label="Migas" className="flex min-w-0 items-center gap-2 text-[13px] font-normal">
      <Link
        href={backHref}
        className="flex shrink-0 items-center gap-2 rounded-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
        {backLabel}
      </Link>
      <span aria-hidden className="text-text-muted">/</span>
      <span aria-current="page" className="truncate text-text-primary">{current}</span>
    </nav>
  );
}
