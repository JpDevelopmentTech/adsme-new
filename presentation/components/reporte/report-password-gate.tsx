import { ArrowRight, CircleAlert, Lock } from "lucide-react";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import {
  REPORT_GATE_COPY,
  REPORT_PASSWORD_FIELD,
} from "@/constants/report-link.constants";
import { unlockReportAction } from "@/presentation/actions/unlock-report-action";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import type { ReportPasswordGateProps } from "@/types/report.types";

/**
 * Puerta de un reporte protegido (`C8`). Sigue sin revelar ninguna cifra del
 * lanzamiento, pero el problema de esta pantalla no es el formulario sino la
 * confianza: quien recibe el enlace por mensaje necesita reconocer de quién es
 * antes de escribir una clave. Por eso la mitad izquierda cuenta qué hay al
 * otro lado con el mismo lenguaje visual que el reporte.
 */
export function ReportPasswordGate({
  code,
  jobTitle,
  hasError,
}: ReportPasswordGateProps) {
  return (
    <main className="bg-ambient flex min-h-dvh items-center justify-center p-5 sm:p-10">
      <div className="glass-panel flex w-full max-w-[880px] flex-col overflow-hidden rounded-card md:flex-row">
        <aside className="flex flex-col justify-between gap-9 bg-ink/94 p-8 md:w-[360px]">
          {/* En columna flex el logo se estira al ancho del panel: `self-start`
              lo devuelve a su proporción real. */}
          <BrandWordmark tone="light" className="h-5 self-start" />

          <div className="flex flex-col gap-3">
            <p className="font-display text-[26px] leading-[1.2] font-light tracking-[-0.8px] text-g-50">
              {REPORT_GATE_COPY.pitchTitle}
            </p>
            <p className="text-[13px] leading-[1.5] text-g-400">
              {REPORT_GATE_COPY.pitchBody}
            </p>
          </div>

          <p className="flex items-center gap-2.5">
            <span aria-hidden className="flex items-center gap-[5px]">
              {PLATFORM_ORDER.map((platform) => (
                <span
                  key={platform}
                  className="size-[7px] rounded-pill"
                  style={{ backgroundColor: PLATFORM_META[platform].chartColor }}
                />
              ))}
            </span>
            <span className="text-[11.5px] text-g-500">
              {REPORT_GATE_COPY.pitchPlatforms}
            </span>
          </p>
        </aside>

        <form
          action={unlockReportAction}
          className="flex min-w-0 flex-1 flex-col gap-[18px] p-8 sm:p-10"
        >
          <input type="hidden" name="code" value={code} />

          <span
            aria-hidden
            className="glass-field grid size-11 place-items-center rounded-md"
          >
            <Lock size={20} strokeWidth={1.5} className="text-text-secondary" />
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="font-display text-2xl font-light tracking-[-0.7px] text-text-primary">
              {REPORT_GATE_COPY.title}
            </h1>
            <p className="text-[13px] leading-[1.5] text-text-secondary">
              {jobTitle
                ? REPORT_GATE_COPY.body(jobTitle)
                : REPORT_GATE_COPY.fallbackBody}
            </p>
          </div>

          <label
            className={`glass-field flex items-center gap-2.5 rounded-md px-3.5 py-3 transition-colors duration-150 ${
              hasError ? "border-danger bg-danger/[0.06]" : "focus-within:border-ink"
            }`}
          >
            <Lock
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className={hasError ? "shrink-0 text-danger" : "shrink-0 text-text-muted"}
            />
            <input
              name={REPORT_PASSWORD_FIELD}
              type="password"
              autoComplete="current-password"
              required
              aria-label={REPORT_GATE_COPY.placeholder}
              aria-invalid={hasError}
              placeholder={REPORT_GATE_COPY.placeholder}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>

          {/* El aviso va pegado al campo y antes del botón: ahí es donde mira
              quien acaba de fallar la clave. */}
          {hasError ? (
            <p role="alert" className="flex items-center gap-2 text-[12.5px] text-danger">
              <CircleAlert size={15} strokeWidth={1.5} aria-hidden />
              {REPORT_GATE_COPY.invalid}
            </p>
          ) : null}

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-[13px] font-medium text-g-50 shadow-float transition-all duration-150 hover:-translate-y-px hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none"
          >
            {REPORT_GATE_COPY.submit}
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
          </button>

          <p className="text-[11.5px] leading-[1.45] text-text-muted">
            {REPORT_GATE_COPY.help}
          </p>
        </form>
      </div>
    </main>
  );
}
