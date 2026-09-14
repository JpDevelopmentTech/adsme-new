import type { ClientKind } from "@/domain/entities/client";
import type { ClientFormValues } from "@/types/client-form.types";

export const CLIENT_KINDS = [
  "Artista",
  "Banda",
  "Manager",
] as const satisfies readonly ClientKind[];

export const CLIENT_GENRES = [
  "Pop",
  "Urbano",
  "Rock",
  "Indie",
  "Salsa",
  "Trap",
  "Cumbia",
  "R&B",
  "Varios",
] as const;

export const CLIENT_COUNTRIES = [
  "Colombia",
  "México",
  "Argentina",
  "Chile",
  "Perú",
  "Ecuador",
  "España",
  "Estados Unidos",
] as const;

export const AVATAR_MAX_SIZE_BYTES = 4 * 1024 * 1024;

/** Tipos que aceptan los buckets de imágenes. `image/jpg` no es estándar pero
 *  algunos sistemas lo reportan así al arrastrar un JPEG. */
export const AVATAR_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

/** Gradiente del avatar de un cliente nuevo, mientras no tenga foto propia. */
export const DEFAULT_CLIENT_GRADIENT = { from: "#7C3AED", to: "#DB2777" };

export const EMPTY_CLIENT_FORM_VALUES: ClientFormValues = {
  name: "",
  handle: "",
  kind: "Artista",
  genre: CLIENT_GENRES[0],
  email: "",
  phone: "",
  city: "",
  country: CLIENT_COUNTRIES[0],
  notes: "",
};
