/**
 * Desfase con el que arranca cada barra del indicador de actividad. Sin él las
 * tres pulsarían a la vez y el conjunto parecería un solo bloque parpadeando.
 */
export const LOADER_BAR_DELAYS = ["0ms", "140ms", "280ms"] as const;
