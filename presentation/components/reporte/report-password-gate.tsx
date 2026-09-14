import { ArrowRight, Lock } from "lucide-react";
import { REPORT_GATE_COPY } from "@/constants/report-link.constants";
import { REPORT_PASSWORD_FIELD } from "@/constants/report-link.constants";
import { unlockReportAction } from "@/presentation/actions/unlock-report-action";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { ReportPasswordGateProps } from "@/types/report.types";

/**
 * Puerta de un reporte protegido (`C8`). No revela nada del lanzamiento salvo
 * su nombre: quien no tenga la clave no debe deducir cifras desde aquí.
 */
export function ReportPasswordGate({
  code,
  jobTitle,
  hasError,
}: ReportPasswordGateProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-[18px] px-8 text-center">
      <span className="grid size-24 place-items-center rounded-pill border border-brand-violet/25 bg-card shadow-[0_0_32px_#7C3AED33]">
        <Lock size={40} className="text-brand-violet" aria-hidden />
      </span>

      <BrandWordmark className="h-6" />

      <h1 className="font-display text-2xl font-bold text-text-primary">
        {REPORT_GATE_COPY.title}
      </h1>

      <p className="max-w-[420px] text-sm leading-[1.5] text-text-secondary">
        {jobTitle
          ? REPORT_GATE_COPY.body(jobTitle)
          : REPORT_GATE_COPY.fallbackBody}
      </p>

      <form
        action={unlockReportAction}
        className="flex w-full max-w-[340px] flex-col gap-3"
      >
        <input type="hidden" name="code" value={code} />

        <label className="flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-3.5 focus-within:border-brand-violet/70">
          <Lock size={17} className="shrink-0 text-text-muted" aria-hidden />
          <input
            name={REPORT_PASSWORD_FIELD}
            type="password"
            autoComplete="current-password"
            required
            aria-label={REPORT_GATE_COPY.placeholder}
            placeholder={REPORT_GATE_COPY.placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </label>

        {hasError ? (
          <p role="alert" className="text-[13px] text-danger">
            {REPORT_GATE_COPY.invalid}
          </p>
        ) : null}

        <PrimaryButton type="submit" className="w-full">
          <ArrowRight size={18} strokeWidth={2} aria-hidden />
          {REPORT_GATE_COPY.submit}
        </PrimaryButton>
      </form>

      <p className="max-w-[340px] text-xs leading-[1.4] text-text-muted">
        {REPORT_GATE_COPY.help}
      </p>
    </main>
  );
}
