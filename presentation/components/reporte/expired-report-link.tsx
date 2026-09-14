import { CalendarX } from "lucide-react";
import { REPORT_GATE_COPY } from "@/constants/report-link.constants";

/** Enlace con fecha de caducidad ya vencida (`C7`, variante de expiración). */
export function ExpiredReportLink() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="grid size-24 place-items-center rounded-pill border border-danger/25 bg-card shadow-[0_0_32px_#E11D4833]">
        <CalendarX size={40} className="text-danger" aria-hidden />
      </span>

      <div className="flex max-w-[420px] flex-col gap-2">
        <h1 className="font-display text-xl font-bold text-text-primary">
          {REPORT_GATE_COPY.expiredTitle}
        </h1>
        <p className="text-sm leading-[1.5] text-text-secondary">
          {REPORT_GATE_COPY.expiredBody}
        </p>
      </div>

      <p className="text-xs text-text-muted">{REPORT_GATE_COPY.expiredCode}</p>
    </main>
  );
}
