"use client";

import { TriangleAlert, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { AccountPickerRow } from "@/presentation/components/ui/account-picker-row";
import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type {
  AccountMultiPickerProps,
  AccountPickerData,
} from "@/types/account-picker.types";

/**
 * Deja ver y cambiar de qué cuentas publicitarias se importan campañas. Admite
 * varias a la vez porque lo normal es administrar más de una, y las plataformas
 * deciden el orden con el que las devuelven: sin esto quedaba conectada una
 * arbitraria. Las cuentas se consultan al abrir, no en cada carga de la
 * pantalla, para no gastar una llamada a la API por visita.
 */
export function AccountMultiPicker({
  isOpen,
  onClose,
  isAfterConnect,
  copy,
  load,
  action,
}: AccountMultiPickerProps) {
  const [data, setData] = useState<AccountPickerData | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [isLoading, startLoading] = useTransition();

  useEffect(() => {
    if (!isOpen || data) return;

    startLoading(async () => {
      const result = await load();

      setData(result);
      setChecked(result.selectedIds);
    });
  }, [isOpen, data, load]);

  const toggle = (accountId: string) =>
    setChecked((current) =>
      current.includes(accountId)
        ? current.filter((id) => id !== accountId)
        : [...current, accountId],
    );

  const options = data?.options ?? [];

  return (
    <ModalSheet isOpen={isOpen} label={copy.title} onClose={onClose}>
      <form action={action} className="flex flex-col gap-3.5 p-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {copy.title}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {isAfterConnect ? copy.pickAfterConnect : copy.subtitle}
          </p>
        </div>

        {isLoading || !data ? (
          <p className="py-3 text-center text-[12.5px] text-text-muted">
            {copy.loading}
          </p>
        ) : null}

        {!isLoading && data && options.length === 0 ? (
          <p className="py-3 text-center text-[12.5px] text-text-muted">
            {copy.empty}
          </p>
        ) : null}

        {!isLoading && data && options.length > 0 ? (
          <>
            <ul className="flex max-h-[42vh] flex-col gap-1 overflow-y-auto">
              {options.map((option) => (
                <AccountPickerRow
                  key={option.id}
                  option={option}
                  isChecked={checked.includes(option.id)}
                  onToggle={toggle}
                />
              ))}
            </ul>

            <p className="flex items-start gap-2 rounded-sm border border-warning/20 bg-warning/[0.05] px-3 py-2.5 text-[11px] leading-[1.35] text-text-secondary">
              <TriangleAlert
                size={14}
                className="mt-px shrink-0 text-warning"
                aria-hidden
              />
              {copy.warning}
            </p>
          </>
        ) : null}

        <div className="flex flex-wrap justify-end gap-2.5">
          <SecondaryButton
            type="button"
            onClick={onClose}
            icon={<X size={16} strokeWidth={1.75} aria-hidden />}
          >
            {copy.cancel}
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={checked.length === 0}>
            {copy.confirm}
          </PrimaryButton>
        </div>
      </form>
    </ModalSheet>
  );
}
