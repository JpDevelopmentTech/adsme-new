import { CalendarX } from "lucide-react";
import { REPORT_GATE_COPY } from "@/constants/report-link.constants";
import { ReportLinkState } from "@/presentation/components/reporte/report-link-state";

/** Enlace con fecha de caducidad ya vencida. */
export function ExpiredReportLink() {
  return (
    <ReportLinkState
      icon={CalendarX}
      title={REPORT_GATE_COPY.expiredTitle}
      body={REPORT_GATE_COPY.expiredBody}
      code={REPORT_GATE_COPY.expiredCode}
    />
  );
}
