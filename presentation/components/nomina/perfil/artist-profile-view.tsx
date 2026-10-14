import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import { NOMINA_ARTISTS_ROUTE } from "@/constants/routes.constants";
import { ProfileActions } from "@/presentation/components/nomina/modales/profile-actions";
import { ProfileHeader } from "@/presentation/components/nomina/perfil/profile-header";
import { ProfileKpis } from "@/presentation/components/nomina/perfil/profile-kpis";
import { ProfileTabContent } from "@/presentation/components/nomina/perfil/profile-tab-content";
import { ProfileToolbar } from "@/presentation/components/nomina/perfil/profile-toolbar";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";
import { Breadcrumb } from "@/presentation/components/ui/breadcrumb";
import { TabLinks } from "@/presentation/components/ui/tab-links";
import type { ArtistProfileViewProps } from "@/types/nomina-perfil.types";
import { buildProfileTabItems } from "@/utils/build-profile-tab-items";
import { profileCurrentMonth } from "@/utils/profile-current-month";
import { toModalArtist } from "@/utils/to-modal-artist";

/**
 * Perfil del artista, el mismo en el panel y en el portal. En solo lectura se
 * quitan las migas y todo lo que edita; el mes, las pestañas y las gráficas
 * siguen funcionando.
 */
export function ArtistProfileView({ profile, tab, basePath, isReadOnly = false }: ArtistProfileViewProps) {
  return (
    <>
      <AmbientGlow imageUrl={profile.photoUrl} />
      {isReadOnly ? null : <Breadcrumb backHref={NOMINA_ARTISTS_ROUTE} backLabel={PROFILE_COPY.backLabel} current={profile.name} />}
      <ProfileHeader profile={profile} isReadOnly={isReadOnly} />
      <ProfileKpis profile={profile} />
      <ProfileToolbar
        currentMonth={profileCurrentMonth(profile)}
        tabs={<TabLinks label={PROFILE_COPY.tabsLabel} items={buildProfileTabItems(basePath, tab)} className="-mb-px" />}
        actions={
          isReadOnly ? undefined : (
            <ProfileActions
              artist={toModalArtist(profile)}
              socials={profile.socials}
              minShows={profile.progress.minShows}
              movementCount={profile.movementTotals.count}
              fixedProfitGoal={profile.fixedProfitGoal}
              serviceAssumedByAdsme={profile.kpis.serviceAssumedByAdsme}
            />
          )
        }
      />
      <ProfileTabContent profile={profile} tab={tab} isReadOnly={isReadOnly} />
    </>
  );
}
