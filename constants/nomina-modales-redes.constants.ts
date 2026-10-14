import type { NominaSocialMeta } from "@/types/nomina-modales.types";

/** Redes del perfil en el orden del diseño, con su color, dominios y ejemplo. */
export const SOCIAL_NETWORKS: NominaSocialMeta[] = [
  { key: "instagram", label: "Instagram", color: "#E4405F", domains: ["instagram.com"], placeholder: "https://instagram.com/usuario" },
  { key: "facebook", label: "Facebook", color: "#1877F2", domains: ["facebook.com", "fb.com"], placeholder: "https://facebook.com/pagina" },
  { key: "tiktok", label: "TikTok", color: "#FFFFFF", domains: ["tiktok.com"], placeholder: "https://tiktok.com/@usuario" },
  { key: "spotify", label: "Spotify", color: "#1DB954", domains: ["spotify.com"], placeholder: "https://open.spotify.com/artist/..." },
  { key: "youtube", label: "YouTube", color: "#FF0000", domains: ["youtube.com", "youtu.be"], placeholder: "https://youtube.com/@canal" },
  { key: "x", label: "X", color: "#FFFFFF", domains: ["x.com", "twitter.com"], placeholder: "https://x.com/usuario" },
];

/** Color de los iconos de red sin enlace. */
export const SOCIAL_EMPTY_COLOR = "#ffffff66";
