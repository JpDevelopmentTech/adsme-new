import type { Metadata } from "next";
import { nominaPortalRoute } from "@/constants/routes.constants";
import { createGetNominaArtistProfile } from "@/domain/use-cases/get-nomina-artist-profile";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { createSupabaseNominaRepository } from "@/infrastructure/repositories/supabase-nomina-repository";
import { ArtistProfileView } from "@/presentation/components/nomina/perfil/artist-profile-view";
import { PortalNotEnabledState } from "@/presentation/components/nomina/portal/portal-not-enabled-state";
import { resolveProfileTab } from "@/utils/resolve-profile-tab";

export const metadata: Metadata = { title: "Portal del artista · adsme" };

/** Portal de solo lectura: el perfil del propio artista o el aviso de que aún no está habilitado. */
export default async function ArtistPortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const profile = await createGetNominaArtistProfile(createSupabaseNominaRepository(await createServerSupabaseClient(), new Date()))(id);

  if (!profile) return <PortalNotEnabledState />;

  return <ArtistProfileView isReadOnly profile={profile} tab={resolveProfileTab(query.pestana)} basePath={nominaPortalRoute(id)} />;
}
