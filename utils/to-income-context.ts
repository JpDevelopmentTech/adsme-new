import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { NominaIncomeMonthProps } from "@/types/nomina-modals.types";
import { profileCurrentMonth } from "@/utils/profile-current-month";

/** Mínimo de shows y lo facturado en el mes en curso, para la nota del modal de ingreso. */
export function toIncomeContext(profile: NominaArtistProfile): NominaIncomeMonthProps {
  const month = profileCurrentMonth(profile);
  return {
    minShows: profile.progress.minShows,
    monthBilled: profile.kpis.monthIncome,
    monthMovementCount: profile.movements.filter((movement) => movement.assignedMonth === month).length,
  };
}
