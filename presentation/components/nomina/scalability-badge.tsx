import type { NominaScalability } from "@/domain/entities/nomina-artist";
import { StatusBadge } from "@/presentation/components/ui/status-badge";

/** «Escalable» en verde o «En Desarrollo» en ámbar, siempre con texto. */
export function ScalabilityBadge({ value }: { value: NominaScalability }) {
  return <StatusBadge label={value} tone={value === "Escalable" ? "success" : "warning"} />;
}
