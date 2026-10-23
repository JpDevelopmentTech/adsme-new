import type { QuoteSex } from "@/domain/entities/quote";
import type { InterestPlatformFilter } from "@/types/quote-campaign.types";

/** Clientes guardados que caben en el desplegable del artista. */
export const MAX_CLIENT_OPTIONS = 30;

/** Zonas por grupo y en total en el buscador de zonas. */
export const MAX_ZONES_PER_GROUP = 40;
export const MAX_ZONE_OPTIONS = 160;

/** País que se muestra en el buscador de zonas cuando el segmento no tiene ninguno con zonas. */
export const DEFAULT_ZONE_COUNTRY = "CO";

/** Pestaña de intereses activa al abrir. */
export const DEFAULT_INTEREST_CATEGORY = "Música";

export const SEX_OPTIONS: { value: QuoteSex; label: string }[] = [
  { value: "Todos", label: "Todos" },
  { value: "Mujeres", label: "Mujeres" },
  { value: "Hombres", label: "Hombres" },
];

export const INTEREST_PLATFORM_OPTIONS: { value: InterestPlatformFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "M", label: "Meta" },
  { value: "T", label: "TikTok" },
  { value: "G", label: "Google" },
];

/** Meses abreviados para fechas cortas en español sin depender del ICU del entorno. */
export const SHORT_MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"] as const;

/** Clases de las píldoras de elección del cotizador. */
export const CHIP_BASE_CLASSES =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-pill border px-3.5 text-[13px] transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none";
