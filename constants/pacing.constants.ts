import { Minus, TrendingDown, TrendingUp } from "lucide-react";

/** Pastilla del ritmo del gasto: icono y tono según vaya por delante o por detrás. */
export const PACING_PILL_STYLES = {
  ahead: { icon: TrendingUp, classes: "bg-success/12 text-success" },
  behind: { icon: TrendingDown, classes: "bg-warning/12 text-warning" },
  even: { icon: Minus, classes: "bg-lilac/12 text-lilac" },
} as const;

/** Anillos del ritmo: diámetro y grosor de cada uno, en px, como en `adsme.pen`. */
export const PACING_RINGS = {
  size: 148,
  outer: { radius: 68, stroke: 10 },
  inner: { radius: 51, stroke: 9 },
} as const;
