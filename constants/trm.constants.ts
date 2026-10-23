/**
 * Límites de la TRM que se puede fijar en un trabajo, en pesos por dólar. No
 * pretenden adivinar el mercado: atrapan errores de escritura, como «4,15» por
 * «4.150» o un cero de más, que convertirían mal todo el gasto en dólares.
 */
export const TRM_LIMITS = { min: 1_000, max: 20_000 } as const;
