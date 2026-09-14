import { z } from "zod";

/** Métricas acumuladas que el script envía por campaña y por día. */
const metricsSchema = z.object({
  spend: z.number().nonnegative().default(0),
  impressions: z.number().int().nonnegative().default(0),
  clicks: z.number().int().nonnegative().default(0),
  reach: z.number().int().nonnegative().default(0),
  videoPlays: z.number().int().nonnegative().default(0),
  engagement: z.number().int().nonnegative().default(0),
  comments: z.number().int().nonnegative().default(0),
  shares: z.number().int().nonnegative().default(0),
  reactions: z.number().int().nonnegative().default(0),
});

const campaignSchema = metricsSchema.extend({
  externalCampaignId: z.string().trim().min(1).max(64),
  name: z.string().trim().min(1).max(255),
  status: z.string().trim().min(1).max(32),
  objective: z.string().trim().max(64).nullish(),
  startsAt: z.string().trim().max(32).nullish(),
  endsAt: z.string().trim().max(32).nullish(),
});

const daySchema = metricsSchema.extend({
  externalCampaignId: z.string().trim().min(1).max(64),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe venir como YYYY-MM-DD.",
  }),
});

/**
 * Valida lo que envía el script de Google Ads. Los topes por lote acotan el
 * tamaño de cada petición: el script trocea y reenvía, y al ser upsert repetir
 * un lote no duplica nada.
 */
export const googleAdsIngestSchema = z.object({
  customerId: z.string().regex(/^\d{10}$/, {
    message: "El customer id son 10 dígitos sin guiones.",
  }),
  campaigns: z.array(campaignSchema).max(5_000).default([]),
  daily: z.array(daySchema).max(20_000).default([]),
});

export type GoogleAdsIngestInput = z.infer<typeof googleAdsIngestSchema>;
export type GoogleAdsCampaignInput = z.infer<typeof campaignSchema>;
export type GoogleAdsDayInput = z.infer<typeof daySchema>;
