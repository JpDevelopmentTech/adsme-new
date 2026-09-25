import {
  CAMPAIGN_STATE_LABELS,
} from "@/constants/campaigns.constants";
import type { CampaignStateChipProps } from "@/types/campaigns-list.types";

/** Cómo pinta cada estado: activa en verde, pausada en ámbar, terminada apagada. */
const TONES = {
  active: { chip: "bg-success/12 text-success", dot: "bg-success" },
  paused: { chip: "bg-warning/10 text-warning", dot: "bg-warning" },
  ended: { chip: "bg-g-200/70 text-text-secondary", dot: "bg-g-500" },
};

/** Estado de la campaña en la plataforma, ya traducido. */
export function CampaignStateChip({ state }: CampaignStateChipProps) {
  const tone = TONES[state];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-[9px] py-[3px] text-[11px] ${tone.chip}`}
    >
      <span aria-hidden className={`size-[5px] rounded-pill ${tone.dot}`} />
      {CAMPAIGN_STATE_LABELS[state]}
    </span>
  );
}
