import { Disc3 } from "lucide-react";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";

/** Estado vacío de la tabla cuando el cliente todavía no tiene trabajos. */
export function ClientJobsEmpty() {
  return (
    <EmptyStatePanel
      icon={<Disc3 size={24} strokeWidth={1.5} aria-hidden />}
      title={CLIENT_DETAIL_COPY.emptyJobs}
      description={CLIENT_DETAIL_COPY.emptyJobsHint}
    />
  );
}
