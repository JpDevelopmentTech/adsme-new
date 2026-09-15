import { CONNECTION_CARD_COPY } from "@/constants/connections.constants";
import type { ConnectionAccessRailProps } from "@/types/connections.types";
import { cn } from "@/utils/cn";

/**
 * Cuánta autorización le queda a la cuenta. Cuando un token caduca la
 * importación se detiene sin avisar, así que la vigencia se afirma siempre —y
 * no se rotula— en vez de aparecer solo cuando ya urge.
 */
export function ConnectionAccessRail({ access }: ConnectionAccessRailProps) {
  const renewsItself = access.daysLeft === null;
  const label = renewsItself
    ? CONNECTION_CARD_COPY.accessRenews
    : access.isExpiring
      ? CONNECTION_CARD_COPY.accessExpiring(access.daysLeft ?? 0)
      : CONNECTION_CARD_COPY.accessDays(access.daysLeft ?? 0);

  return (
    <div className="flex w-[186px] min-w-[128px] flex-col gap-[7px]">
      <span
        className={cn(
          "truncate text-[11.5px]",
          access.isExpiring ? "text-warning" : "text-text-secondary",
        )}
      >
        {label}
      </span>

      <div aria-hidden className="h-[5px] w-full rounded-pill bg-g-200">
        <div
          className={cn(
            "h-full rounded-pill",
            access.isExpiring ? "bg-warning" : "bg-success",
          )}
          style={{ width: `${Math.max(access.percent, 2)}%` }}
        />
      </div>
    </div>
  );
}
