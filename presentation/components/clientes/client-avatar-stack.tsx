import { MAX_STACKED_AVATARS, PORTFOLIO_COPY } from "@/constants/clients.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { ClientAvatarStackProps } from "@/types/client.types";
import { cn } from "@/utils/cn";

/**
 * Las caras de la cartera, grandes y superpuestas: el sujeto de esta pantalla
 * son personas, no cifras; el resto se resume en un «+N».
 */
export function ClientAvatarStack({ clients }: ClientAvatarStackProps) {
  const shown = clients.slice(0, MAX_STACKED_AVATARS);
  const rest = clients.length - shown.length;

  if (shown.length === 0) return null;

  return (
    <ul aria-label={PORTFOLIO_COPY.stackLabel} className="flex shrink-0 items-center">
      {shown.map((client, index) => (
        <li
          key={client.id}
          title={client.name}
          className={cn("rounded-pill ring-2 ring-canvas", index > 0 && "-ml-4")}
        >
          <Avatar
            initials={client.initials}
            size={52}
            fontSize={15}
            gradient={client.gradient}
            imageUrl={client.avatarUrl}
          />
          <span className="sr-only">{client.name}</span>
        </li>
      ))}

      {rest > 0 ? (
        <li className="-ml-4 grid size-[52px] place-items-center rounded-pill bg-[#2a1a4d] text-[15px] font-normal text-text-primary ring-2 ring-canvas">
          {PORTFOLIO_COPY.more(rest)}
        </li>
      ) : null}
    </ul>
  );
}
