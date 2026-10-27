import type { ClientKind } from "@/domain/entities/client";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import type { ClientFormValues, ClientPreviewMeta } from "@/types/client-form.types";
import type { SelectOptionGroup } from "@/types/ui.types";

/**
 * Tipos de cliente que acepta la base. La agencia pauta para cualquier sector,
 * así que el orden del desplegable lo da `CLIENT_KIND_GROUPS`, no esta lista.
 */
export const CLIENT_KINDS = [
  "Empresa",
  "Marca",
  "Emprendimiento",
  "Tienda online",
  "Restaurante o bar",
  "Agencia",
  "Figura pública",
  "Creador de contenido",
  "Influencer",
  "Artista",
  "Banda",
  "DJ",
  "Productor musical",
  "Compositor",
  "Sello discográfico",
  "Manager",
  "Evento o festival",
  "Medio de comunicación",
  "Podcast",
  "Fundación u ONG",
  "Otro",
] as const satisfies readonly ClientKind[];

/** El desplegable de tipos, agrupado para que la música sea un sector más y no el punto de partida. */
export const CLIENT_KIND_GROUPS: readonly SelectOptionGroup[] = [
  { label: "Negocios", options: ["Empresa", "Marca", "Emprendimiento", "Tienda online", "Restaurante o bar", "Agencia"] },
  { label: "Personas y creadores", options: ["Figura pública", "Creador de contenido", "Influencer"] },
  {
    label: "Música y entretenimiento",
    options: ["Artista", "Banda", "DJ", "Productor musical", "Compositor", "Sello discográfico", "Manager", "Evento o festival"],
  },
  { label: "Medios", options: ["Medio de comunicación", "Podcast"] },
  { label: "Otros", options: ["Fundación u ONG", "Otro"] },
] satisfies readonly (SelectOptionGroup & { options: readonly ClientKind[] })[];

/** Usuario sin la arroba: letras, números, punto y guion bajo, como en las redes. */
export const CLIENT_HANDLE_PATTERN = /^[a-z0-9._]{2,29}$/;

/** Prefijo con el que se guarda y se muestra el usuario. */
export const CLIENT_HANDLE_PREFIX = "@";

/**
 * Sector del cliente. Se guarda en la columna `genre`, que antes era el género
 * musical: el nombre técnico se conserva, el significado ya es de cualquier
 * industria. Orden alfabético con «Otro» al final.
 */
export const CLIENT_SECTORS = [
  "Automotriz",
  "Belleza y cuidado personal",
  "Causas sociales y ONG",
  "Comercio y retail",
  "Construcción e inmobiliaria",
  "Deporte y fitness",
  "Educación",
  "Entretenimiento y eventos",
  "Finanzas y seguros",
  "Gastronomía",
  "Moda",
  "Música",
  "Política y gobierno",
  "Salud y bienestar",
  "Servicios profesionales",
  "Tecnología",
  "Turismo y hotelería",
  "Otro",
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
  kind: "Empresa",
  genre: "",
  email: "",
  phone: "",
  city: "",
  country: CLIENT_COUNTRIES[0],
  notes: "",
};

/** Vista previa de un cliente que todavía no existe: sin trabajos y con la marca de nuevo. */
export const NEW_CLIENT_PREVIEW_META: ClientPreviewMeta = {
  gradient: DEFAULT_CLIENT_GRADIENT,
  jobsCount: 0,
  activeJobsCount: 0,
  status: { label: CLIENT_FORM_COPY.previewNewStatus, tone: "brand" },
};
