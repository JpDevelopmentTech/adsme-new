import "server-only";

import { GOOGLE_ADS_ALL_ACCOUNTS } from "@/constants/google-ads.constants";

/**
 * Secreto compartido con el script que corre dentro de Google Ads. Mientras sea
 * `null` la ingesta queda cerrada: sin él cualquiera podría escribir en el buzón.
 */
export function getGoogleAdsIngestSecret(): string | null {
  const secret = process.env.GOOGLE_ADS_INGEST_SECRET;

  return secret ? secret : null;
}

/**
 * Cuenta publicitaria que se materializa en adsme. Con la variable vacía se
 * importa todo lo que haya en el buzón, que es lo que interesa cuando el script
 * exporta varias subcuentas de la misma MCC.
 */
export function getGoogleAdsCustomerId(): string | null {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;

  return customerId ? customerId : null;
}

/** Identificador de la cuenta con el que se guarda la conexión del usuario. */
export function getGoogleAdsAccountId(): string {
  return getGoogleAdsCustomerId() ?? GOOGLE_ADS_ALL_ACCOUNTS;
}

export function isGoogleAdsConfigured(): boolean {
  return getGoogleAdsIngestSecret() !== null;
}
