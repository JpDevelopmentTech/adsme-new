import type { ClientKind } from "@/domain/entities/client";
import type { ClientFormValues } from "@/types/client-form.types";

/**
 * Tipos de cliente en el orden del desplegable: primero la música, después
 * marcas y negocios, creadores y medios, y por último el resto. «Otro» cierra
 * la lista para que nadie quede sin poder darse de alta.
 */
export const CLIENT_KINDS = [
  "Artista",
  "Banda",
  "DJ",
  "Productor musical",
  "Compositor",
  "Sello discográfico",
  "Manager",
  "Marca",
  "Empresa",
  "Emprendimiento",
  "Tienda online",
  "Restaurante o bar",
  "Creador de contenido",
  "Influencer",
  "Podcast",
  "Medio de comunicación",
  "Figura pública",
  "Evento o festival",
  "Agencia",
  "Fundación u ONG",
  "Otro",
] as const satisfies readonly ClientKind[];

/** Usuario sin la arroba: letras, números, punto y guion bajo, como en las redes. */
export const CLIENT_HANDLE_PATTERN = /^[a-z0-9._]{2,29}$/;

/** Prefijo con el que se guarda y se muestra el usuario. */
export const CLIENT_HANDLE_PREFIX = "@";

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
export const DEFAULT_CLIENT_GRADIENT = { from: "#5e6a65", to: "#1f2a27" };

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
