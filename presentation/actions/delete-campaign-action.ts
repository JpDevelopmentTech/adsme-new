"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CAMPAIGNS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createDeleteCampaign } from "@/domain/use-cases/delete-campaign";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que borra la copia local de una campaña. No la elimina en la
 * plataforma: si sigue existiendo allí, volverá en la próxima sincronización.
 */
export async function deleteCampaignAction(formData: FormData): Promise<void> {
  const campaignId = formData.get("campaignId");
  if (typeof campaignId !== "string" || !campaignId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  await createDeleteCampaign(createSupabaseCampaignRepository(supabase))(campaignId);

  revalidatePath(CAMPAIGNS_ROUTE);
}
