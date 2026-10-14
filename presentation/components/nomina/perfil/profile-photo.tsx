import { Camera } from "lucide-react";
import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import type { ProfilePhotoProps } from "@/types/nomina-perfil.types";

/** Foto grande del artista con su semáforo y, en el panel, el botón para cambiarla. */
export function ProfilePhoto({ name, photoUrl, semaphore, isReadOnly = false }: ProfilePhotoProps) {
  return (
    <div className="relative shrink-0">
      <ArtistAvatar name={name} photoUrl={photoUrl} size={104} semaphore={semaphore} />
      {isReadOnly ? null : (
        <button
          type="button"
          aria-label={PROFILE_COPY.changePhoto}
          title={PROFILE_COPY.changePhoto}
          className="absolute bottom-0 left-0 grid size-8 cursor-pointer place-items-center rounded-pill border border-border-strong bg-[#140b28] text-text-primary transition-colors hover:bg-[#21143d] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
        >
          <Camera size={15} strokeWidth={1.5} aria-hidden />
        </button>
      )}
    </div>
  );
}
