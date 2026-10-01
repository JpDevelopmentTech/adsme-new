/** Alturas en px de las 20 barras del ecualizador del login, tal como están en `adsme.pen`. */
export const EQUALIZER_BAR_HEIGHTS = [
  38, 62, 94, 70, 120, 88, 56, 104, 126, 84, 60, 98, 118, 74, 50, 86, 110, 66, 42, 30,
] as const;

/** Altura de la barra más alta: las demás calculan su opacidad respecto a ella. */
export const EQUALIZER_MAX_HEIGHT_PX = 126;

/** Opacidad de la barra más baja; la más alta llega a 1. */
export const EQUALIZER_MIN_OPACITY = 0.35;

/** Retardo entre barras consecutivas de la animación, en ms. */
export const EQUALIZER_STAGGER_MS = 90;
