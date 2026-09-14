import { CONNECTION_CARD_COPY } from "@/constants/connections.constants";
import type { ConnectionAccessBarProps } from "@/types/connections.types";
import { cn } from "@/utils/cn";

/** Texto de la derecha: los días que quedan, o por qué no hay cuenta atrás. */
function toValue(daysLeft: number | null): string {
  if (daysLeft === null) return CONNECTION_CARD_COPY.accessNoExpiry;
  if (daysLeft === 0) return CONNECTION_CARD_COPY.accessExpired;

  return CONNECTION_CARD_COPY.days(daysLeft);
}

/**
 * Cuánta autorización le queda a la cuenta. Cuando un token caduca la
 * importación se detiene sin avisar, así que la vigencia se muestra siempre y
 * no solo cuando ya urge.
 */
export function ConnectionAccessBar({ access }: ConnectionAccessBarProps) {
  const tone = access.isExpiring ? "text-warning" : "text-text-secondary";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className={cn("text-xs", access.isExpiring ? tone : "text-text-muted")}>
          {access.isExpiring
            ? CONNECTION_CARD_COPY.accessExpiring
            : CONNECTION_CARD_COPY.access}
        </span>
        <span className={cn("text-xs font-semibold", tone)}>
          {toValue(access.daysLeft)}
        </span>
      </div>

      <div
        aria-hidden
        className="h-1.5 overflow-hidden rounded-pill bg-card-elevated"
      >
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
