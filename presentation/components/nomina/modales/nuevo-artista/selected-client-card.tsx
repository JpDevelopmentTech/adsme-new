import { ENROLL_COPY } from "@/constants/nomina-enrollment-copy.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import type { SelectedClientCardProps } from "@/types/nomina-modales-artista.types";

/** Cliente elegido para el alta, con la opción de cambiarlo. */
export function SelectedClientCard({ client, onChange }: SelectedClientCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-lilac/30 bg-lilac/10 px-3.5 py-3">
      <ArtistAvatar name={client.name} photoUrl={client.avatarUrl} size={44} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] text-text-primary">{client.name}</span>
        <span className="truncate text-xs text-text-muted">{client.handle} · {client.kind}</span>
      </div>
      {onChange ? (
        <button type="button" onClick={onChange} className="cursor-pointer rounded-pill px-3 py-1.5 text-[13px] text-lilac hover:bg-lilac/12 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
          {ENROLL_COPY.change}
        </button>
      ) : null}
    </div>
  );
}
