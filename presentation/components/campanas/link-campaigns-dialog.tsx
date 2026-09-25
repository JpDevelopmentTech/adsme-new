"use client";

import { Link2, X } from "lucide-react";
import { useActionState } from "react";
import {
  CAMPAIGNS_COPY,
  LINK_DIALOG_COPY,
} from "@/constants/campaigns.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { linkCampaignsAction } from "@/presentation/actions/link-campaigns-action";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SearchableSelect } from "@/presentation/components/ui/searchable-select";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { LinkCampaignsDialogProps } from "@/types/campaigns-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cierra el flujo de vinculación sin salir de la lista. `B8` sigue existiendo
 * para descubrir campañas cuenta por cuenta; aquí ya están elegidas y lo único
 * que falta es el trabajo de destino.
 */
export function LinkCampaignsDialog({
  campaigns,
  jobOptions,
  isOpen,
  onClose,
  onRemove,
}: LinkCampaignsDialogProps) {
  const [state, formAction, isPending] = useActionState(linkCampaignsAction, {
    message: null,
  });

  return (
    <ModalSheet isOpen={isOpen} label={LINK_DIALOG_COPY.title} onClose={onClose}>
      <form action={formAction} className="flex flex-col gap-3.5 p-5">
        {campaigns.map((campaign) => (
          <input
            key={campaign.id}
            type="hidden"
            name="campaignIds"
            value={campaign.id}
          />
        ))}

        <div className="flex flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {LINK_DIALOG_COPY.title}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {LINK_DIALOG_COPY.subtitle(campaigns.length)}
          </p>
        </div>

        <SearchableSelect
          id="jobId"
          name="jobId"
          surface="elevated"
          label={LINK_DIALOG_COPY.targetLabel}
          placeholder={LINK_DIALOG_COPY.targetPlaceholder}
          options={jobOptions}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
            {LINK_DIALOG_COPY.selectedLabel(campaigns.length)}
          </span>

          <ul className="flex max-h-[32vh] flex-col gap-1.5 overflow-y-auto">
            {campaigns.map((campaign) => (
              <li
                key={campaign.id}
                className="glass-field flex items-center gap-[9px] rounded-md px-3 py-2"
              >
                <span
                  aria-hidden
                  className="size-[7px] shrink-0 rounded-pill"
                  style={{
                    backgroundColor: PLATFORM_META[campaign.platform].chartColor,
                  }}
                />
                <span className="min-w-0 flex-1 truncate text-[12.5px] font-light text-text-primary">
                  {campaign.name}
                </span>
                <span className="text-[12px] font-light whitespace-nowrap text-text-secondary">
                  {formatCompactCurrency(campaign.spend)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(campaign.id)}
                  aria-label={LINK_DIALOG_COPY.remove(campaign.name)}
                  className="cursor-pointer text-text-muted transition-colors hover:text-text-primary"
                >
                  <X size={14} strokeWidth={1.75} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[11px] font-light text-text-muted">
          {LINK_DIALOG_COPY.note}
        </p>

        {state.message ? <FormAlert message={state.message} /> : null}

        <div className="flex flex-wrap justify-end gap-2.5">
          <SecondaryButton
            type="button"
            onClick={onClose}
            icon={<X size={16} strokeWidth={1.75} aria-hidden />}
          >
            {LINK_DIALOG_COPY.cancel}
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            isLoading={isPending}
            disabled={campaigns.length === 0}
          >
            <Link2 size={15} strokeWidth={1.75} aria-hidden />
            {CAMPAIGNS_COPY.linkSelected(campaigns.length)}
          </PrimaryButton>
        </div>
      </form>
    </ModalSheet>
  );
}
