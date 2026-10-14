import { Eye } from "lucide-react";
import { PORTAL_COPY } from "@/constants/nomina-portal-copy.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Barra superior del portal: el logo, que es solo lectura y la píldora que lo recuerda. */
export function PortalTopbar() {
  return (
    <header className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-8">
      <BrandWordmark className="h-6" />
      <p className="hidden min-w-0 flex-1 truncate text-[13px] text-text-muted sm:block">{PORTAL_COPY.lead}</p>
      <span className="ml-auto flex shrink-0 items-center gap-2 rounded-pill border border-border bg-surface px-3.5 py-1.5 text-xs text-text-secondary">
        <Eye size={14} strokeWidth={1.5} aria-hidden />
        {PORTAL_COPY.readOnlyPill}
      </span>
    </header>
  );
}
