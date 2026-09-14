"use client";

import { CalendarDays, Dices, Eye, EyeOff, Lock, Save } from "lucide-react";
import { useState } from "react";
import {
  LINK_FORM_FIELDS,
  LINK_OPTIONS,
  STEP_FOUR_COPY,
} from "@/constants/report-config.constants";
import { saveReportLinkProtectionAction } from "@/presentation/actions/save-report-link-protection-action";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { ToggleSwitch } from "@/presentation/components/ui/toggle-switch";
import type { ReportLinkProtectionFormProps } from "@/types/job-wizard.types";
import { buildPassphrase } from "@/utils/build-passphrase";

/**
 * Condiciones de acceso del enlace. Cada campo solo aparece cuando su
 * interruptor está encendido: enseñar un campo de fecha vacío junto a una
 * opción apagada invita a rellenarlo y no surte efecto.
 */
export function ReportLinkProtectionForm({
  jobId,
  hasPassword,
  expiresOn,
}: ReportLinkProtectionFormProps) {
  const [withPassword, setWithPassword] = useState(hasPassword);
  const [withExpiry, setWithExpiry] = useState(Boolean(expiresOn));
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [passwordOption, expiryOption] = LINK_OPTIONS;

  return (
    <form
      action={saveReportLinkProtectionAction}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name={LINK_FORM_FIELDS.jobId} value={jobId} />

      <div className="overflow-hidden rounded-md border border-border bg-card-elevated">
        <div className="flex flex-col border-b border-border">
          <ToggleSwitch
            id={LINK_FORM_FIELDS.passwordEnabled}
            name={LINK_FORM_FIELDS.passwordEnabled}
            label={passwordOption.label}
            description={passwordOption.description}
            defaultChecked={hasPassword}
            onChange={(event) => setWithPassword(event.target.checked)}
          />

          {withPassword ? (
            <div className="flex flex-wrap items-center gap-2.5 px-[18px] pb-3.5">
              <label className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-md border border-border bg-card px-3.5 py-2.5 focus-within:border-brand-violet/70">
                <Lock size={16} className="shrink-0 text-text-muted" aria-hidden />
                <input
                  name={LINK_FORM_FIELDS.password}
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder={
                    hasPassword
                      ? "••••••••  ·  escribe una nueva para cambiarla"
                      : STEP_FOUR_COPY.passwordPlaceholder
                  }
                  aria-label={STEP_FOUR_COPY.passwordPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((visible) => !visible)}
                  aria-label={isVisible ? "Ocultar la clave" : "Mostrar la clave"}
                  className="cursor-pointer text-text-muted transition-colors hover:text-text-primary"
                >
                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <SecondaryButton
                type="button"
                onClick={() => {
                  setPassword(buildPassphrase());
                  setIsVisible(true);
                }}
                className="px-4 py-2.5 text-[13px]"
                icon={<Dices size={16} strokeWidth={2} aria-hidden />}
              >
                {STEP_FOUR_COPY.generate}
              </SecondaryButton>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <ToggleSwitch
            id={LINK_FORM_FIELDS.expiryEnabled}
            name={LINK_FORM_FIELDS.expiryEnabled}
            label={expiryOption.label}
            description={expiryOption.description}
            defaultChecked={Boolean(expiresOn)}
            onChange={(event) => setWithExpiry(event.target.checked)}
          />

          {withExpiry ? (
            <div className="flex flex-wrap items-center gap-3 px-[18px] pb-3.5">
              <label className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3.5 py-2.5 focus-within:border-brand-violet/70">
                <CalendarDays
                  size={16}
                  className="shrink-0 text-text-muted"
                  aria-hidden
                />
                <input
                  name={LINK_FORM_FIELDS.expiresOn}
                  type="date"
                  defaultValue={expiresOn ?? ""}
                  aria-label={expiryOption.label}
                  className="bg-transparent text-[13px] text-text-primary outline-none [color-scheme:dark]"
                />
              </label>

              <p className="text-xs text-text-muted">
                {STEP_FOUR_COPY.expiryHint}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <PrimaryButton type="submit" className="self-start">
        <Save size={18} strokeWidth={2} aria-hidden />
        {STEP_FOUR_COPY.save}
      </PrimaryButton>
    </form>
  );
}
