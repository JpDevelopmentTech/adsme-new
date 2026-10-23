import { PLATFORM_HEADER_COPY } from "@/constants/quote-platforms-copy.constants";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { PlatformStatus } from "@/types/quote-platforms.types";

/** Píldoras de estado de la plataforma: «Con descuento» en ámbar y la alerta en rojo. */
export function PlatformStatusPills({ hasDiscount, alert }: PlatformStatus) {
  if (!hasDiscount && !alert) return null;
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {hasDiscount ? <StatusBadge label={PLATFORM_HEADER_COPY.discount} tone="warning" /> : null}
      {alert ? <StatusBadge label={alert === "loss" ? PLATFORM_HEADER_COPY.loss : PLATFORM_HEADER_COPY.underBudget} tone="danger" /> : null}
    </span>
  );
}
