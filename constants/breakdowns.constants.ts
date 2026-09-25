/** Tramo al que van a parar los valores que la plataforma no sabe clasificar. */
export const UNKNOWN_BUCKET = "desconocido";

export const UNKNOWN_LABEL = "Sin determinar";

/**
 * Límite inferior de cada franja de edad, de mayor a menor. Es el orden en que
 * se busca: la primera que no supera la edad recibida es la suya.
 *
 * Son las franjas de Meta, que TikTok y Google comparten salvo en el tramo
 * alto: ellos separan 55-64 y 65+, así que todo lo de 55 en adelante se junta.
 */
export const AGE_BUCKETS: { from: number; bucket: string; label: string }[] = [
  { from: 55, bucket: "55+", label: "55+" },
  { from: 45, bucket: "45-54", label: "45–54" },
  { from: 35, bucket: "35-44", label: "35–44" },
  { from: 25, bucket: "25-34", label: "25–34" },
  { from: 18, bucket: "18-24", label: "18–24" },
  { from: 13, bucket: "13-17", label: "13–17" },
];

/** Orden en que se pintan las franjas de edad: de la más joven a la mayor. */
export const AGE_ORDER = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
  UNKNOWN_BUCKET,
];

export const GENDER_LABELS: Record<string, string> = {
  female: "Mujeres",
  male: "Hombres",
};

/** Orden en que se pintan los sexos. */
export const GENDER_ORDER = ["female", "male", UNKNOWN_BUCKET];

/**
 * Regiones que se listan una a una en la tarjeta; el resto se suma en «Otras».
 * Sin tope, una cuenta con entrega en todo el país llena la tarjeta de barras
 * del 1% y deja de decir de dónde vino la gente.
 */
export const TERRITORIES_LIMIT = 6;

export const OTHER_TERRITORIES_LABEL = "Otras";
