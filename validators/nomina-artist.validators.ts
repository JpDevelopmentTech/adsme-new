import { z } from "zod";
import { MIN_VIABLE_NOMINA } from "@/constants/nomina-modales.constants";
import { SOCIAL_NETWORKS } from "@/constants/nomina-modales-redes.constants";
import { checkSocialUrl } from "@/utils/check-social-url";

const money = z.number().int().min(0);

/** Modelo de reparto de un artista. */
export const splitTermsSchema = z
  .object({
    hasService: z.boolean(),
    service: money.nullable(),
    servicePayer: z.enum(["cliente", "adsme"]),
    hasScalability: z.boolean(),
    profitPercent: z.number().min(0).max(100),
    profitPerShowAfterMin: money,
    hasFixedProfit: z.boolean(),
    fixedProfit: money,
  })
  .refine((terms) => !terms.hasFixedProfit || terms.fixedProfit > 0, { message: "Escribe el monto de la Utilidad fija.", path: ["fixedProfit"] });

const minShowsSchema = z.number().int().min(1, { message: "El Mínimo de Shows debe ser al menos 1." }).max(60);

/** Alta de un cliente en Nómina con su configuración. */
export const enrollSchema = z.object({
  clientId: z.uuid(),
  nomina: z.number().int().min(MIN_VIABLE_NOMINA, { message: "La nómina mínima viable es $200.000 COP." }),
  minShows: minShowsSchema,
  startsOn: z.iso.date(),
  split: splitTermsSchema,
});

/** Cambio de mínimo de shows y modelo de reparto. */
export const configSchema = z.object({ clientId: z.uuid(), minShows: minShowsSchema, split: splitTermsSchema });

const socialLinkSchema = z
  .object({ network: z.enum(["instagram", "facebook", "tiktok", "spotify", "youtube", "x"]), url: z.string().trim().max(300).optional() })
  .refine((link) => {
    const domains = SOCIAL_NETWORKS.find((meta) => meta.key === link.network)?.domains ?? [];
    return checkSocialUrl(link.url ?? "", domains) !== "invalid";
  }, { message: "Escribe un enlace web válido." });

/** Redes del artista: como mucho una por red. */
export const socialsSchema = z.object({ clientId: z.uuid(), socials: z.array(socialLinkSchema).max(6) });

/** Cambio de foto del artista: el archivo se valida aparte. */
export const photoSchema = z.object({ clientId: z.uuid() });

/** Baja de Nómina. */
export const unenrollSchema = z.object({ clientId: z.uuid() });
