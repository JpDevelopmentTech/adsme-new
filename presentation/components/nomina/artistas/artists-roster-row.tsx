"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { nominaArtistRoute } from "@/constants/routes.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import { NewIncomeButton } from "@/presentation/components/nomina/modales/new-income-button";
import { ScalabilityBadge } from "@/presentation/components/nomina/scalability-badge";
import type { ArtistsRosterRowProps } from "@/types/nomina-artistas.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatLongDate } from "@/utils/format-nomina-dates";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";
import { ROSTER_STICKY_FIRST_CLASSES, ROSTER_STICKY_SECOND_CLASSES } from "@/utils/roster-table-styles";

const MONEY = cn(NOMINA_TD_CLASSES, "text-right");

/**
 * Fila del roster: toda la fila abre el perfil (el nombre es el enlace para
 * teclado) y el «+» registra un ingreso sin navegar.
 */
export function ArtistsRosterRow({ entry }: ArtistsRosterRowProps) {
  const router = useRouter();
  const href = nominaArtistRoute(entry.id);

  return (
    <tr onClick={() => router.push(href)} className={cn(NOMINA_ROW_CLASSES, "group cursor-pointer transition-colors duration-150 hover:bg-white/[0.03]")}>
      <td className={cn(NOMINA_TD_CLASSES, ROSTER_STICKY_FIRST_CLASSES)}>
        <span className="flex items-center gap-3">
          <ArtistAvatar name={entry.name} photoUrl={entry.photoUrl} size={34} semaphore={entry.semaphore} />
          <Link href={href} onClick={(event) => event.stopPropagation()} className="truncate rounded-sm text-sm text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
            {entry.name}
          </Link>
        </span>
      </td>
      <td className={cn(NOMINA_TD_CLASSES, ROSTER_STICKY_SECOND_CLASSES)} onClick={(event) => event.stopPropagation()}>
        <NewIncomeButton artist={entry} variant="icon" monthBilled={entry.monthIncome} monthMovementCount={entry.monthEvents} />
      </td>
      <td className={cn(MONEY, "font-normal text-text-primary")}>{formatExactCurrency(entry.monthIncome)}</td>
      <td className={cn(NOMINA_TD_CLASSES, "text-right")}>{entry.monthEvents}</td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        <ScalabilityBadge value={entry.scalability} />
      </td>
      <td className={MONEY}>{formatExactCurrency(entry.grossTotal)}</td>
      <td className={MONEY}>{formatExactCurrency(entry.labelProfitTotal)}</td>
      <td className={MONEY}>{formatExactCurrency(entry.nomina)}</td>
      <td className={cn(MONEY, "font-medium text-text-primary")}>{formatExactCurrency(entry.availableBudget)}</td>
      <td className={cn(NOMINA_TD_CLASSES, "text-right")}>{formatLongDate(entry.joinedAt)}</td>
    </tr>
  );
}
