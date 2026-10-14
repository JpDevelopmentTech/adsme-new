import { History } from "lucide-react";
import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import type { HistoricMonthBannerProps } from "@/types/nomina-perfil.types";

/** Aviso ámbar de que se está viendo un mes histórico, con la vuelta al mes actual. */
export function HistoricMonthBanner({ monthLabel, onBack }: HistoricMonthBannerProps) {
  return (
    <div role="status" className="flex flex-wrap items-center gap-3 rounded-md border border-warning/30 bg-warning/10 px-[18px] py-3.5">
      <History size={17} strokeWidth={1.5} className="shrink-0 text-warning" aria-hidden />
      <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-text-primary">
        {PROFILE_COPY.bannerLead} <strong className="font-normal">{monthLabel}</strong> {PROFILE_COPY.bannerTail}
      </p>
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer rounded-sm text-[13px] font-normal text-warning underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        {PROFILE_COPY.bannerBack}
      </button>
    </div>
  );
}
