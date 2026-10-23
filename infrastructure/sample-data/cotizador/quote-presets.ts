import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";

/** Edades de los selectores «Desde» y «Hasta». */
export const QUOTE_AGES: string[] = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "65+"];

/** Plataformas que se pueden agregar, con su color y el ejemplo de resultado. */
export const QUOTE_PRESETS: QuotePlatformPreset[] = [
  {
    "key": "youtube",
    "name": "YouTube",
    "addedName": "YouTube",
    "color": "#E5322D",
    "linePlaceholder": "Ej: 500k Views"
  },
  {
    "key": "tiktok",
    "name": "TikTok",
    "addedName": "TikTok",
    "color": "#22B8C8",
    "linePlaceholder": "Ej: 2M Impresiones"
  },
  {
    "key": "meta",
    "name": "Meta",
    "addedName": "Meta",
    "color": "#1877F2",
    "linePlaceholder": "Ej: 1M Impresiones"
  },
  {
    "key": "spotify",
    "name": "Spotify",
    "addedName": "Spotify",
    "color": "#1DB954",
    "linePlaceholder": "Ej: Marquee"
  },
  {
    "key": "google",
    "name": "Google Ads",
    "addedName": "Google Ads",
    "color": "#F4B400",
    "linePlaceholder": "Ej: 300k Clics"
  },
  {
    "key": "otra",
    "name": "Otra plataforma",
    "addedName": "Nueva plataforma",
    "color": "#8A90A3",
    "linePlaceholder": "Ej: Resultado esperado"
  }
];

/** Entidad de la que se retira el pago, según la moneda. */
export const QUOTE_ENTITIES = { COP: "EM COL SAS", USD: "EM US Latin LLC" } as const;
