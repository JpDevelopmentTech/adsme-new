import type {
  ReportAudience,
  ReportHouseholds,
  ReportKeyword,
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
 * `campaign_daily_metrics`.
 * Al conectar los datos reales, borra este archivo y apaga
 * `SHOW_SAMPLE_REPORT_SECTIONS`.
 */

/** Una serie por plataforma: con la misma curva en las tres no se distinguirían. */

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
