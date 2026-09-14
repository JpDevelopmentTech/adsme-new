import {
  CLIENT_COUNTRIES,
  CLIENT_GENRES,
  CLIENT_KINDS,
} from "@/constants/client-form.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { SelectField } from "@/presentation/components/ui/select-field";
import { TextField } from "@/presentation/components/ui/text-field";
import { TextareaField } from "@/presentation/components/ui/textarea-field";
import type { ClientFormFieldsProps } from "@/types/client-form.types";
import type { ClientKind } from "@/domain/entities/client";

export function ClientFormFields({
  values,
  errors,
  onChange,
}: ClientFormFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextField
          id="name"
          name="name"
          surface="elevated"
          label={CLIENT_FORM_COPY.nameLabel}
          placeholder={CLIENT_FORM_COPY.namePlaceholder}
          value={values.name}
          error={errors.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
        <TextField
          id="handle"
          name="handle"
          surface="elevated"
          label={CLIENT_FORM_COPY.handleLabel}
          placeholder={CLIENT_FORM_COPY.handlePlaceholder}
          value={values.handle}
          error={errors.handle}
          onChange={(event) => onChange("handle", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <SelectField
          id="kind"
          name="kind"
          surface="elevated"
          label={CLIENT_FORM_COPY.kindLabel}
          options={CLIENT_KINDS}
          value={values.kind}
          error={errors.kind}
          onChange={(event) => onChange("kind", event.target.value as ClientKind)}
        />
        <SelectField
          id="genre"
          name="genre"
          surface="elevated"
          label={CLIENT_FORM_COPY.genreLabel}
          options={CLIENT_GENRES}
          value={values.genre}
          error={errors.genre}
          onChange={(event) => onChange("genre", event.target.value)}
        />
      </div>

      <div className="h-px bg-border" />

      <h2 className="font-display text-[15px] font-semibold text-text-primary">
        {CLIENT_FORM_COPY.sectionContact}
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextField
          id="email"
          name="email"
          type="email"
          surface="elevated"
          label={CLIENT_FORM_COPY.emailLabel}
          placeholder={CLIENT_FORM_COPY.emailPlaceholder}
          value={values.email}
          error={errors.email}
          onChange={(event) => onChange("email", event.target.value)}
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
          surface="elevated"
          label={CLIENT_FORM_COPY.phoneLabel}
          placeholder={CLIENT_FORM_COPY.phonePlaceholder}
          value={values.phone}
          error={errors.phone}
          onChange={(event) => onChange("phone", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextField
          id="city"
          name="city"
          surface="elevated"
          label={CLIENT_FORM_COPY.cityLabel}
          placeholder={CLIENT_FORM_COPY.cityPlaceholder}
          value={values.city}
          error={errors.city}
          onChange={(event) => onChange("city", event.target.value)}
        />
        <SelectField
          id="country"
          name="country"
          surface="elevated"
          label={CLIENT_FORM_COPY.countryLabel}
          options={CLIENT_COUNTRIES}
          value={values.country}
          error={errors.country}
          onChange={(event) => onChange("country", event.target.value)}
        />
      </div>

      <TextareaField
        id="notes"
        name="notes"
        surface="elevated"
        label={CLIENT_FORM_COPY.notesLabel}
        placeholder={CLIENT_FORM_COPY.notesPlaceholder}
        value={values.notes}
        error={errors.notes}
        onChange={(event) => onChange("notes", event.target.value)}
      />
    </>
  );
}
