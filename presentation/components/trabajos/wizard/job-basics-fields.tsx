import { ArrowRight } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/constants/currency.constants";
import { JOB_FORMATS, JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { CurrencyField } from "@/presentation/components/ui/currency-field";
import { DateField } from "@/presentation/components/ui/date-field";
import { SearchableSelect } from "@/presentation/components/ui/searchable-select";
import { SelectField } from "@/presentation/components/ui/select-field";
import { TextField } from "@/presentation/components/ui/text-field";
import { TextareaField } from "@/presentation/components/ui/textarea-field";
import type { JobBasicsFieldsProps } from "@/types/job-wizard.types";
import type { JobFormat } from "@/domain/entities/job";
import { formatThousands } from "@/utils/format-thousands";

export function JobBasicsFields({
  values,
  errors,
  clientOptions,
  onChange,
}: JobBasicsFieldsProps) {
  return (
    <div className="flex flex-1 flex-col gap-[18px]">
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

      <div className="flex flex-col gap-4 sm:flex-row">
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
          onChange={(event) => onChange("format", event.target.value as JobFormat)}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[13px] font-medium text-text-secondary">
          {JOB_WIZARD_COPY.periodLabel}
        </legend>

        <div className="flex items-start gap-3">
          <DateField
            id="startsOn"
            name="startsOn"
            surface="elevated"
            label={JOB_WIZARD_COPY.startLabel}
            value={values.startsOn}
            error={errors.startsOn}
            onChange={(event) => onChange("startsOn", event.target.value)}
          />
          <ArrowRight
            size={18}
            aria-hidden
            className="mt-3.5 shrink-0 text-text-muted"
          />
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
      </fieldset>

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
    </div>
  );
}
