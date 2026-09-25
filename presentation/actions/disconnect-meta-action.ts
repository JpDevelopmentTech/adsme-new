"use server";

import { disconnectPlatform } from "@/presentation/actions/disconnect-platform";

/** Desvincula Meta Ads con todas sus cuentas y las campañas importadas de ellas. */
export async function disconnectMetaAction(): Promise<void> {
  await disconnectPlatform("meta", "Meta Ads");
}
