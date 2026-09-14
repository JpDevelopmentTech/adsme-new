import { LinkOff } from "@/presentation/components/reporte/link-off-icon";
import { REPORT_LINK_COPY } from "@/constants/report-link.constants";

/** Pantalla mostrada cuando el token no es válido, caducó o fue regenerado. */
export function InvalidReportLink() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <LinkOff />
      <div className="flex max-w-[420px] flex-col gap-2">
        <h1 className="font-display text-xl font-bold text-text-primary">
          {REPORT_LINK_COPY.invalidTitle}
        </h1>
        <p className="text-sm leading-[1.5] text-text-secondary">
          {REPORT_LINK_COPY.invalidBody}
        </p>
      </div>
    </main>
  );
}
