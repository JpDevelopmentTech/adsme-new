import type { Metadata } from "next";
import { NOMINA_ARTISTS_ROUTE, nominaArtistRoute } from "@/constants/routes.constants";
import { createGetNominaArtistProfile } from "@/domain/use-cases/get-nomina-artist-profile";
import { createSampleNominaRepository } from "@/infrastructure/repositories/sample-nomina-repository";
import { ArtistProfileView } from "@/presentation/components/nomina/perfil/artist-profile-view";
import { ProfileNotFound } from "@/presentation/components/nomina/perfil/profile-not-found";
import { resolveProfileTab } from "@/utils/resolve-profile-tab";

export const metadata: Metadata = { title: "Perfil del artista · adsme" };

/** Perfil de un artista de la Nómina Plan, con la pestaña de `?pestana=`. */
export default async function NominaArtistPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const profile = await createGetNominaArtistProfile(createSampleNominaRepository())(id);

  if (!profile) return <ProfileNotFound backHref={NOMINA_ARTISTS_ROUTE} />;

  return <ArtistProfileView profile={profile} tab={resolveProfileTab(query.pestana)} basePath={nominaArtistRoute(id)} />;
}
