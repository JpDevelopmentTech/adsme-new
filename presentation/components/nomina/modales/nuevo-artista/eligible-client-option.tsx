import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import type { EligibleClientOptionProps } from "@/types/nomina-modales-artista.types";

/** Cliente que se puede inscribir: foto, nombre y @usuario; al tocarlo se elige. */
export function EligibleClientOption({ client, onPick }: EligibleClientOptionProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onPick(client)}
        className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-border bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-border-strong hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <ArtistAvatar name={client.name} photoUrl={client.avatarUrl} size={36} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm text-text-primary">{client.name}</span>
          <span className="truncate text-xs text-text-muted">{client.handle} · {client.kind}</span>
        </span>
      </button>
    </li>
  );
}
