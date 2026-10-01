import { ArrowRight, CalendarRange, Disc3, Wallet } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/constants/currency.constants";
import {
  JOB_FORMATS,
  JOB_WIZARD_COPY,
  JOB_WIZARD_SECTIONS,
} from "@/constants/job-wizard.constants";
import { JobCoverUploader } from "@/presentation/components/trabajos/wizard/job-cover-uploader";
import { WizardSection } from "@/presentation/components/trabajos/wizard/wizard-section";
import { CurrencyField } from "@/presentation/components/ui/currency-field";
import { DateField } from "@/presentation/components/ui/date-field";
import { SearchableSelect } from "@/presentation/components/ui/searchable-select";
import { SelectField } from "@/presentation/components/ui/select-field";
import { TextField } from "@/presentation/components/ui/text-field";
import { TextareaField } from "@/presentation/components/ui/textarea-field";
import type { JobBasicsFieldsProps } from "@/types/job-wizard.types";
import type { JobFormat } from "@/domain/entities/job";
import { formatDailyAmount } from "@/utils/format-daily-amount";
import { formatDuration } from "@/utils/format-duration";
import { formatThousands } from "@/utils/format-thousands";
import { parseThousands } from "@/utils/parse-thousands";

const DURATION_CLASSES =
  "flex h-[50px] shrink-0 items-center rounded-md bg-lilac/12 px-4 text-sm font-normal text-lilac";

const DAILY_CLASSES = "flex h-[50px] shrink-0 items-center text-lg font-light text-text-primary";

/**
 * Los campos del paso 1, agrupados por la pregunta que responden en vez de
 * apilados. Cada grupo devuelve su cálculo derivado —duración, coste diario—
 * en el momento en que sirve para decidir, no en la pantalla siguiente.
 */
export function JobBasicsFields({
  values,
  errors,
  clientOptions,
  cover,
  onChange,
}: JobBasicsFieldsProps) {
  const duration = formatDuration(values.startsOn, values.endsOn);
  const dailyAmount = formatDailyAmount(
    parseThousands(values.investment),
    values.startsOn,
    values.endsOn,
  );

  return (
    <>
      <WizardSection label={JOB_WIZARD_SECTIONS.what} icon={<Disc3 size={15} strokeWidth={1.5} aria-hidden />}>
        <div className="flex flex-col gap-[22px] lg:flex-row lg:items-start">
          <JobCoverUploader {...cover} />

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <TextField
              id="title"
              name="title"
              surface="elevated"
              label={JOB_WIZARD_COPY.titleLabel}
              placeholder={JOB_WIZARD_COPY.titlePlaceholder}
              value={values.title}
              error={errors.title}
              onChange={(event) => onChange("title", event.target.value)}
            />

            <div className="flex flex-col gap-3.5 sm:flex-row">
              <SearchableSelect
                id="clientId"
                name="clientId"
                surface="elevated"
                label={JOB_WIZARD_COPY.clientLabel}
                placeholder={JOB_WIZARD_COPY.clientPlaceholder}
                options={clientOptions}
                defaultValue={values.clientId}
                error={errors.clientId}
              />

              <SelectField
                id="format"
                name="format"
                surface="elevated"
                label={JOB_WIZARD_COPY.formatLabel}
                options={JOB_FORMATS}
                value={values.format}
                error={errors.format}
                onChange={(event) =>
                  onChange("format", event.target.value as JobFormat)
                }
              />
            </div>
          </div>
        </div>
      </WizardSection>

      <WizardSection label={JOB_WIZARD_SECTIONS.when} icon={<CalendarRange size={15} strokeWidth={1.5} aria-hidden />}>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[150px] flex-1">
            <DateField
              id="startsOn"
              name="startsOn"
              surface="elevated"
              label={JOB_WIZARD_COPY.startLabel}
              value={values.startsOn}
              error={errors.startsOn}
              onChange={(event) => onChange("startsOn", event.target.value)}
            />
          </div>

          <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="mb-4 shrink-0 text-text-muted" />

          <div className="min-w-[150px] flex-1">
            <DateField
              id="endsOn"
              name="endsOn"
              surface="elevated"
              label={JOB_WIZARD_COPY.endLabel}
              value={values.endsOn}
              error={errors.endsOn}
              onChange={(event) => onChange("endsOn", event.target.value)}
            />
          </div>

          {duration ? <p className={DURATION_CLASSES}>{duration}</p> : null}
        </div>
      </WizardSection>

      <WizardSection label={JOB_WIZARD_SECTIONS.howMuch} icon={<Wallet size={15} strokeWidth={1.5} aria-hidden />}>
        <div className="flex flex-wrap items-end gap-3">
          <CurrencyField
            id="investment"
            name="investment"
            surface="elevated"
            label={JOB_WIZARD_COPY.investmentLabel}
            hint={JOB_WIZARD_COPY.investmentHint}
            symbol={CURRENCY_SYMBOL}
            currency={JOB_WIZARD_COPY.investmentCurrency}
            placeholder="0"
            value={values.investment}
            error={errors.investment}
            onChange={(event) =>
              onChange("investment", formatThousands(event.target.value))
            }
          />

          {dailyAmount ? <p className={DAILY_CLASSES}>{dailyAmount}</p> : null}
        </div>

        <TextareaField
          id="description"
          name="description"
          surface="elevated"
          label={JOB_WIZARD_COPY.descriptionLabel}
          placeholder={JOB_WIZARD_COPY.descriptionPlaceholder}
          value={values.description}
          error={errors.description}
          onChange={(event) => onChange("description", event.target.value)}
        />
      </WizardSection>
    </>
  );
}
