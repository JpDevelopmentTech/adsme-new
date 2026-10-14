import { PROFILE_NOT_FOUND_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { BackLink } from "@/presentation/components/ui/back-link";
import type { ProfileNotFoundProps } from "@/types/nomina-perfil.types";

/** Perfil de un artista que no existe: la vuelta a Artistas y el aviso. */
export function ProfileNotFound({ backHref }: ProfileNotFoundProps) {
  return (
    <section className="glass-panel flex flex-col gap-3 rounded-card px-6 py-5">
      <BackLink href={backHref} label={PROFILE_NOT_FOUND_COPY.back} />
      <h1 className="text-xl font-light text-text-primary">{PROFILE_NOT_FOUND_COPY.title}</h1>
    </section>
  );
}
