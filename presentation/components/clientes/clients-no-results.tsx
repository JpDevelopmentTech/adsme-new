"use client";

import { SearchX, X } from "lucide-react";
import { CLIENTS_NO_RESULTS_COPY } from "@/constants/client-filters.constants";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQueryParams } from "@/presentation/hooks/use-query-params";

/** Aparece cuando hay clientes pero ninguno pasa los filtros vigentes. */
export function ClientsNoResults() {
  const { clearParams, isPending } = useQueryParams();

  return (
    <EmptyStatePanel
      icon={<SearchX size={24} strokeWidth={1.5} aria-hidden />}
      title={CLIENTS_NO_RESULTS_COPY.title}
      description={CLIENTS_NO_RESULTS_COPY.subtitle}
      action={
        <SecondaryButton
          type="button"
          icon={<X size={16} strokeWidth={1.75} aria-hidden />}
          isLoading={isPending}
          onClick={clearParams}
        >
          {CLIENTS_NO_RESULTS_COPY.action}
        </SecondaryButton>
      }
    />
  );
}
