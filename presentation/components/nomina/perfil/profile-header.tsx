import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { ProfilePhoto } from "@/presentation/components/nomina/perfil/profile-photo";
import { SocialBar } from "@/presentation/components/nomina/perfil/social-bar";
import type { ProfileHeaderProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatLongDate } from "@/utils/format-nomina-dates";

/** Cabecera del perfil: foto, nombre, nómina y alta en el roster, y sus redes. */
export function ProfileHeader({ profile, isReadOnly = false }: ProfileHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <ProfilePhoto clientId={profile.id} name={profile.name} photoUrl={profile.photoUrl} semaphore={profile.semaphore} isReadOnly={isReadOnly} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h1 className="text-[40px] leading-tight font-extralight tracking-[-1px] text-text-primary sm:text-5xl">{profile.name}</h1>
        <p className="flex flex-wrap items-center gap-x-2.5 text-sm text-text-secondary">
          <span>
            {PROFILE_COPY.nominaLead} {formatExactCurrency(profile.nomina)}
          </span>
          <span aria-hidden className="size-1 rounded-pill bg-text-muted" />
          <span>
            {PROFILE_COPY.joinedLead} {formatLongDate(profile.joinedAt)}
          </span>
        </p>
      </div>
      <div className="self-start sm:pt-3">
        <SocialBar socials={profile.socials} isReadOnly={isReadOnly} />
      </div>
    </header>
  );
}
