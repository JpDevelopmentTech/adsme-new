"use server";

import { disconnectPlatform } from "@/presentation/actions/disconnect-platform";

/** Desvincula TikTok Ads con todas sus cuentas de anunciante y sus campañas. */
export async function disconnectTiktokAction(): Promise<void> {
  await disconnectPlatform("tiktok", "TikTok Ads");
}
