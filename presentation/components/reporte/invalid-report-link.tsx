import { Link2Off } from "lucide-react";
import { REPORT_LINK_COPY } from "@/constants/report-link.constants";
import { ReportLinkState } from "@/presentation/components/reporte/report-link-state";

/** Pantalla mostrada cuando el token no es válido, caducó o fue regenerado. */
export function InvalidReportLink() {
  return (
    <ReportLinkState icon={Link2Off} title={REPORT_LINK_COPY.invalidTitle} body={REPORT_LINK_COPY.invalidBody} />
  );
}
