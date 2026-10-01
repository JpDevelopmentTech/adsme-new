import { ArrowRight, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_GATE_COPY, REPORT_PASSWORD_FIELD } from "@/constants/report-link.constants";
import { unlockReportAction } from "@/presentation/actions/unlock-report-action";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import { PasswordField } from "@/presentation/components/ui/password-field";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { ReportPasswordGateProps } from "@/types/report.types";

/**
 * Puerta de un reporte protegido. No revela ninguna cifra del lanzamiento,
 * pero el problema de esta pantalla no es el formulario sino la confianza:
 * quien recibe el enlace por mensaje necesita reconocer de quién es antes de
 * escribir una clave. Por eso la mitad izquierda cuenta qué hay al otro lado.
 */
export function ReportPasswordGate({ code, jobTitle, hasError }: ReportPasswordGateProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4 sm:p-10">
      <div className="glass-float flex w-full max-w-[980px] flex-col overflow-hidden rounded-[36px] md:flex-row">
        <aside className="flex flex-col justify-between gap-[22px] border-b border-border bg-linear-to-b from-brand-magenta/25 to-brand-magenta/4 p-8 sm:p-12 md:w-[460px] md:shrink-0 md:border-r md:border-b-0">
          {/* En columna flex el logo se estira al ancho del panel: `self-start`
              lo devuelve a su proporción real. */}
          <BrandWordmark className="h-7 self-start" />

          <div className="flex flex-col gap-3.5">
            <p className="text-[34px] leading-[1.15] font-extralight tracking-[-0.8px] text-text-primary">
              {REPORT_GATE_COPY.pitchTitle}
            </p>
            <p className="text-[15px] leading-[1.55] font-light text-text-secondary">{REPORT_GATE_COPY.pitchBody}</p>
          </div>

          <ul className="flex flex-wrap gap-3.5">
            {PLATFORM_ORDER.map((platform) => (
              <li key={platform} className="flex items-center gap-2 text-[13px] text-text-secondary">
                <span aria-hidden className="size-2 rounded-pill" style={{ backgroundColor: PLATFORM_META[platform].chartColor }} />
                {PLATFORM_META[platform].label}
              </li>
            ))}
          </ul>
        </aside>

        <form action={unlockReportAction} className="flex min-w-0 flex-1 flex-col gap-[22px] p-8 sm:px-[52px] sm:py-14">
          <input type="hidden" name="code" value={code} />

          <span aria-hidden className="grid size-14 place-items-center rounded-[18px] border border-white/20 bg-surface">
            <LockKeyhole size={24} strokeWidth={1.5} className="text-text-primary" />
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="text-[28px] font-extralight text-text-primary">{REPORT_GATE_COPY.title}</h1>
            <p className="text-sm leading-[1.55] font-light text-text-secondary">
              {jobTitle ? REPORT_GATE_COPY.body(jobTitle) : REPORT_GATE_COPY.fallbackBody}
            </p>
          </div>

          {/* El aviso va pegado al campo y antes del botón: ahí es donde mira
              quien acaba de fallar la clave. */}
          <PasswordField
            id={REPORT_PASSWORD_FIELD}
            name={REPORT_PASSWORD_FIELD}
            label={REPORT_GATE_COPY.placeholder}
            autoComplete="current-password"
            required
            autoFocus
            error={hasError ? REPORT_GATE_COPY.invalid : undefined}
            leading={<KeyRound size={16} strokeWidth={1.5} className={hasError ? "text-danger" : "text-text-muted"} aria-hidden />}
          />

          <PrimaryButton type="submit" className="w-full py-3.5 text-[15px]">
            {REPORT_GATE_COPY.submit}
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </PrimaryButton>

          <p className="flex items-start gap-2 text-xs leading-[1.45] text-text-muted">
            <ShieldCheck size={14} strokeWidth={1.5} className="mt-px shrink-0" aria-hidden />
            {REPORT_GATE_COPY.help}
          </p>
        </form>
      </div>
    </main>
  );
}
