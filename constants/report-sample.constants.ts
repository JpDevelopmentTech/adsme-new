import type { JobPlatform } from "@/domain/entities/job";
import type {
  ReportAudience,
  ReportHouseholds,
  ReportKeyword,
  ReportSeries,
  ReportTerritory,
} from "@/types/report.types";

/**
 * DATOS DE MUESTRA — no salen de ninguna plataforma.
 *
 * Territorios, audiencia y hogares salen de los `breakdowns` de Meta, que
 * todavía no se importan, así que estas secciones se rellenan con las cifras
 * del `.pen` para poder revisar el reporte completo. Las palabras clave no
 * existen en Meta: solo tendrían sentido con los términos de búsqueda de
 * Google Ads.
 *
 * La curva de evolución ya **no** es de muestra: la sirve
 * `campaign_daily_metrics`. `SAMPLE_TREND_BY_PLATFORM` solo entra cuando una
 * plataforma aún no tiene serie importada.
 *
 * Al conectar los datos reales, borra este archivo y apaga
 * `SHOW_SAMPLE_REPORT_SECTIONS`.
 */
const TICKS = ["1 jul", "8", "15", "22", "30"];

/** Una serie por plataforma: con la misma curva en las tres no se distinguirían. */
export const SAMPLE_TREND_BY_PLATFORM: Record<JobPlatform, ReportSeries> = {
  youtube: {
    label: "Reproducciones en el tiempo",
    points: [
      12, 18, 26, 22, 31, 44, 38, 52, 61, 55, 68, 74, 82, 71, 88, 96, 105, 98,
      112, 124, 118, 133, 141, 129, 148, 157, 166, 154, 172, 188,
    ],
    ticks: TICKS,
  },
  meta: {
    label: "Reproducciones de vídeo",
    points: [
      30, 42, 38, 55, 61, 58, 72, 84, 79, 91, 88, 103, 97, 112, 124, 118, 131,
      126, 142, 138, 151, 147, 160, 172, 165, 178, 170, 186, 181, 194,
    ],
    ticks: TICKS,
  },
  tiktok: {
    label: "Reproducciones de vídeo",
    points: [
      8, 14, 11, 24, 38, 31, 47, 66, 58, 82, 74, 96, 112, 101, 128, 141, 133,
      158, 172, 164, 186, 178, 197, 189, 206, 214, 203, 221, 216, 229,
    ],
    ticks: TICKS,
  },
};

export const SAMPLE_TERRITORIES: ReportTerritory[] = [
  { name: "Bogotá", percent: 32 },
  { name: "Medellín", percent: 21 },
  { name: "Cali", percent: 14 },
  { name: "Barranquilla", percent: 9 },
  { name: "Bucaramanga", percent: 6 },
  { name: "Otras", percent: 18 },
];

export const SAMPLE_AUDIENCE: ReportAudience = {
  gender: [
    { label: "Hombres", percent: 58 },
    { label: "Mujeres", percent: 42 },
  ],
  age: [
    { label: "18–24", percent: 34 },
    { label: "25–34", percent: 41 },
    { label: "35–44", percent: 16 },
    { label: "45+", percent: 9 },
  ],
};

export const SAMPLE_HOUSEHOLDS: ReportHouseholds = {
  income: [
    { label: "Top 10%", percent: 14 },
    { label: "11–20%", percent: 22 },
    { label: "21–30%", percent: 26 },
    { label: "Resto", percent: 38 },
  ],
  parental: [
    { label: "Con hijos", percent: 38 },
    { label: "Sin hijos", percent: 62 },
  ],
};

export const SAMPLE_KEYWORDS: ReportKeyword[] = [
  { term: "corazón de neón", volume: "142 K" },
  { term: "luna vélez", volume: "98 K" },
  { term: "música pop 2026", volume: "54 K" },
  { term: "canciones nuevas", volume: "41 K" },
  { term: "reels música", volume: "33 K" },
];
