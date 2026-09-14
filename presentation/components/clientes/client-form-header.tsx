import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import type { ClientFormHeaderProps } from "@/types/client-form.types";

/** Encabezado del formulario: vuelta al listado, título y acciones de guardado. */
export function ClientFormHeader({ title, isPending }: ClientFormHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-[5px]">
        <Link
          href={CLIENTS_ROUTE}
          className="flex w-fit items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={15} aria-hidden />
          {CLIENT_FORM_COPY.back}
        </Link>
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2.5">
        <SecondaryLink href={CLIENTS_ROUTE}>
          {CLIENT_FORM_COPY.cancel}
        </SecondaryLink>
        <PrimaryButton type="submit" isLoading={isPending}>
          {isPending ? null : <Check size={18} strokeWidth={2} aria-hidden />}
          {CLIENT_FORM_COPY.save}
        </PrimaryButton>
      </div>
    </div>
  );
}
