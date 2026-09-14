"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LINK_CAMPAIGN_COPY } from "@/constants/link-campaign.constants";
import { CAMPAIGNS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createLinkCampaignsToJob } from "@/domain/use-cases/link-campaigns-to-job";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { LinkCampaignsState } from "@/types/link-campaign.types";

/** Server Action que asocia las campañas marcadas con el trabajo elegido. */
export async function linkCampaignsAction(
  _prevState: LinkCampaignsState,
  formData: FormData,
): Promise<LinkCampaignsState> {
  const jobId = formData.get("jobId");
  const campaignIds = formData
    .getAll("campaignIds")
    .filter((value): value is string => typeof value === "string");

  if (campaignIds.length === 0) {
    return { message: LINK_CAMPAIGN_COPY.needsSelection };
  }
  if (typeof jobId !== "string" || !jobId) {
    return { message: LINK_CAMPAIGN_COPY.needsTarget };
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const result = await createLinkCampaignsToJob(
    createSupabaseCampaignRepository(supabase),
  )(campaignIds, jobId);

  if (!result.success) {
    return { message: "No pudimos vincular las campañas. Inténtalo de nuevo." };
  }

  revalidatePath(CAMPAIGNS_ROUTE);
  redirect(CAMPAIGNS_ROUTE);
}
