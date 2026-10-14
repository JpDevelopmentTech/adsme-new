/** Redes que se enlazan en el perfil del artista. */
export type NominaSocialNetwork = "instagram" | "facebook" | "tiktok" | "spotify" | "youtube" | "x";

/** Enlace a una red; sin `url` el icono queda en gris para agregarlo. */
export interface NominaSocialLink {
  network: NominaSocialNetwork;
  url?: string;
}
