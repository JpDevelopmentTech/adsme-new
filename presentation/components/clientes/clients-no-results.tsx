"use client";

import { SearchX } from "lucide-react";
import { CLIENTS_NO_RESULTS_COPY } from "@/constants/client-filters.constants";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQueryParams } from "@/presentation/hooks/use-query-params";

/** Aparece cuando hay clientes pero ninguno pasa los filtros vigentes. */
export function ClientsNoResults() {
  const { clearParams, isPending } = useQueryParams();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border bg-surface px-8 py-16 text-center">
      <SearchX size={26} className="text-text-muted" aria-hidden />
      <div className="flex w-[420px] max-w-full flex-col gap-1.5">
        <p className="font-display text-base font-bold text-text-primary">
          {CLIENTS_NO_RESULTS_COPY.title}
        </p>
        <p className="text-[13px] leading-[1.5] text-text-secondary">
          {CLIENTS_NO_RESULTS_COPY.subtitle}
        </p>
      </div>
      <SecondaryButton
        type="button"
        icon={null}
        isLoading={isPending}
        onClick={clearParams}
        className="px-5 py-2.5 text-[13px]"
      >
        {CLIENTS_NO_RESULTS_COPY.action}
      </SecondaryButton>
    </div>
  );
}
