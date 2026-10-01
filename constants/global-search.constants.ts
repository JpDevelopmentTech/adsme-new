/** Ruta del endpoint del buscador global. */
export const GLOBAL_SEARCH_ENDPOINT = "/api/search";

/** Caracteres mínimos para lanzar la búsqueda; con menos, cualquier cosa coincide. */
export const GLOBAL_SEARCH_MIN_CHARS = 2;

/** Longitud máxima del término aceptado por el endpoint. */
export const GLOBAL_SEARCH_MAX_CHARS = 80;

/** Resultados como mucho por grupo, para que el desplegable quepa sin scroll largo. */
export const GLOBAL_SEARCH_LIMIT = 5;

/** Espera tras la última tecla antes de consultar, en ms. */
export const GLOBAL_SEARCH_DEBOUNCE_MS = 250;

/** Textos del buscador global y de su desplegable. */
export const GLOBAL_SEARCH_COPY = {
  groups: { clients: "Clientes", jobs: "Trabajos", campaigns: "Campañas" },
  loading: "Buscando…",
  error: "No pudimos buscar. Inténtalo de nuevo.",
  minChars: "Escribe al menos 2 letras para buscar.",
  empty: (term: string) => `Sin resultados para «${term}»`,
  emptyHint: "Prueba con el nombre del artista, el @usuario o el título del lanzamiento.",
  hint: "↑↓ para moverte · Enter para abrir · Esc para cerrar",
  resultsLabel: "Resultados de la búsqueda",
  /** Anuncio para lectores de pantalla cuando llegan resultados. */
  resultsCount: (count: number) => (count === 1 ? "1 resultado" : `${count} resultados`),
  campaignId: "ID",
} as const;
