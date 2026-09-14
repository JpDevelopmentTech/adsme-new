"use client";

import { TriangleAlert, Wallet, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  TIKTOK_ACCOUNT_COPY,
  TIKTOK_PICK_ACCOUNT_PARAM,
  TIKTOK_PICK_ACCOUNT_VALUE,
} from "@/constants/tiktok-ads.constants";
import { listTiktokAccountsAction } from "@/presentation/actions/list-tiktok-accounts-action";
import { selectTiktokAccountAction } from "@/presentation/actions/select-tiktok-account-action";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { TiktokAccountsResult } from "@/types/tiktok-ads.types";

/**
 * Deja ver y cambiar de qué cuenta de anunciante se importan las campañas.
 * TikTok decide el orden con el que devuelve las cuentas, así que sin esto
 * quedaba conectada una arbitraria. Se consultan al abrir, no en cada carga.
 */
export function TiktokAccountPicker() {
  const shouldOpen =
    useSearchParams().get(TIKTOK_PICK_ACCOUNT_PARAM) === TIKTOK_PICK_ACCOUNT_VALUE;

  // Lo que decida el usuario manda sobre lo que pida la URL; derivarlo así
  // evita copiar la URL a un estado inicial y romper la hidratación.
  const [override, setOverride] = useState<boolean | null>(null);
  const [result, setResult] = useState<TiktokAccountsResult | null>(null);
  const [isLoading, startLoading] = useTransition();
  const isOpen = override ?? shouldOpen;

  useEffect(() => {
    if (!isOpen || result) return;

    startLoading(async () => setResult(await listTiktokAccountsAction()));
  }, [isOpen, result]);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setOverride(true)}
        className="flex cursor-pointer items-center gap-2 self-start text-[13px] font-semibold text-brand-violet transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
      >
        <Wallet size={15} aria-hidden />
        {TIKTOK_ACCOUNT_COPY.change}
      </button>
    );
  }

  const accounts = result?.accounts ?? [];

  return (
    <form
      action={selectTiktokAccountAction}
      className="flex w-full flex-col gap-3 rounded-md border border-border bg-card-elevated p-3.5"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-sm font-semibold text-text-primary">
          {TIKTOK_ACCOUNT_COPY.title}
        </h3>
        <p className="text-xs text-text-secondary">
          {shouldOpen
            ? TIKTOK_ACCOUNT_COPY.pickAfterConnect
            : TIKTOK_ACCOUNT_COPY.subtitle}
        </p>
      </div>

      {isLoading || !result ? (
        <p className="py-3 text-center text-[13px] text-text-muted">
          {TIKTOK_ACCOUNT_COPY.loading}
        </p>
      ) : null}

      {!isLoading && result && accounts.length === 0 ? (
        <p className="py-3 text-center text-[13px] text-text-muted">
          {TIKTOK_ACCOUNT_COPY.empty}
        </p>
      ) : null}

      {!isLoading && result && accounts.length > 0 ? (
        <>
          <ul className="flex flex-col gap-1">
            {accounts.map((account) => (
              <li key={account.id}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 transition-colors hover:bg-card">
                  <input
                    type="radio"
                    name="accountId"
                    value={account.id}
                    defaultChecked={account.id === result.currentId}
                    className="size-3.5 shrink-0 accent-brand-violet"
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13px] font-semibold text-text-primary">
                      {account.name}
                    </span>
                    <span className="truncate text-[11px] text-text-muted">
                      {account.id}
                      {account.currency ? ` · ${account.currency}` : ""}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <p className="flex items-start gap-2 rounded-sm border border-warning/20 bg-warning/[0.05] px-3 py-2.5 text-[11px] leading-[1.35] text-text-secondary">
            <TriangleAlert
              size={14}
              className="mt-px shrink-0 text-warning"
              aria-hidden
            />
            {TIKTOK_ACCOUNT_COPY.warning}
          </p>

          <div className="flex flex-wrap gap-2.5">
            <PrimaryButton type="submit">
              {TIKTOK_ACCOUNT_COPY.confirm}
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={() => setOverride(false)}
              icon={<X size={18} strokeWidth={2} aria-hidden />}
            >
              {TIKTOK_ACCOUNT_COPY.cancel}
            </SecondaryButton>
          </div>
        </>
      ) : null}
    </form>
  );
}
