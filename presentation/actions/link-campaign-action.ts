"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CAMPAIGNS_ROUTE, CONNECTIONS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createLinkCampaignToJob } from "@/domain/use-cases/link-campaign-to-job";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que vincula una campaña con un trabajo. Un `jobId` vacío la
 * desvincula, que es como se corrige una asociación equivocada.
 */
export async function linkCampaignAction(formData: FormData): Promise<void> {
  const campaignId = formData.get("campaignId");
  const jobId = formData.get("jobId");

  if (typeof campaignId !== "string" || !campaignId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  await createLinkCampaignToJob(createSupabaseCampaignRepository(supabase))(
    campaignId,
    typeof jobId === "string" && jobId ? jobId : null,
  );

  revalidatePath(CAMPAIGNS_ROUTE);
  revalidatePath(CONNECTIONS_ROUTE);
}
