import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";

/** Nombre y color de marca de cada red, en el orden de la barra del perfil. */
export const SOCIAL_NETWORK_META: Record<NominaSocialNetwork, { label: string; color: string }> = {
  instagram: { label: "Instagram", color: "#E4405F" },
  facebook: { label: "Facebook", color: "#1877F2" },
  tiktok: { label: "TikTok", color: "#FFFFFF" },
  spotify: { label: "Spotify", color: "#1DB954" },
  youtube: { label: "YouTube", color: "#FF0000" },
  x: { label: "X", color: "#FFFFFF" },
};

export const SOCIAL_NETWORK_ORDER: NominaSocialNetwork[] = ["instagram", "facebook", "tiktok", "spotify", "youtube", "x"];

/** Gris de las redes sin enlace: el icono queda atenuado para agregarlo. */
export const SOCIAL_MUTED_COLOR = "#A1A1AA";
