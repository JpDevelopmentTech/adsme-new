import { Disc3 } from "lucide-react";
import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";

/** Estado vacío de la tabla cuando el cliente todavía no tiene trabajos. */
export function ClientJobsEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
      <Disc3 size={22} className="text-text-muted" aria-hidden />
      <p className="text-sm text-text-secondary">
        {CLIENT_DETAIL_COPY.emptyJobs}
      </p>
      <p className="text-[13px] text-text-muted">
        {CLIENT_DETAIL_COPY.emptyJobsHint}
      </p>
    </div>
  );
}
