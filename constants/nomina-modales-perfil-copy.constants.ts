/** Botones de acción del perfil. */
export const PROFILE_ACTIONS_COPY = {
  share: "Compartir",
  settings: "Configuración",
  remove: "Eliminar artista",
} as const;

/** Textos literales del modal «Configuración de {artista}». */
export const SETTINGS_MODAL_COPY = {
  title: (artist: string) => `Configuración de ${artist}`,
  tabsLabel: "Secciones de la configuración",
  tabModel: "Modelo de reparto",
  tabLinks: "Redes y enlaces",
  nominaNote: (nomina: string) =>
    `Nómina ${nomina}. Los cambios aplican a los ingresos que registres o edites desde ahora; los ya guardados conservan su desglose.`,
  minShows: "Mínimo de Shows",
  minShowsHelp: (threshold: string) => `Punto de equilibrio automático: ${threshold} (Mínimo de Shows × Nómina).`,
  linksIntro:
    "Pega el enlace al perfil. Los íconos con enlace se ven a color arriba a la derecha del perfil y te llevan directo a la red.",
  invalidLink: "Escribe un enlace web válido.",
  foreignLink: (network: string) => `Este enlace no parece de ${network}.`,
  searchSpotify: "Buscar en Spotify",
  closeSearch: "Cerrar búsqueda",
  spotifyDisconnected: "Spotify no está conectado. Actívalo en claude.ai → Configuración → Conectores.",
  spotifyPasteLead: "¿Varios artistas con el mismo nombre? Pega el enlace de su perfil de Spotify",
  spotifyPastePlaceholder: "https://open.spotify.com/artist/…",
} as const;

/** Textos literales del modal «Compartir perfil». */
export const SHARE_MODAL_COPY = {
  title: "Compartir perfil",
  subtitle: (artist: string) => `${artist} · acceso de solo lectura`,
  howTitle: "Cómo dar acceso",
  steps: (artist: string) => [
    "Invita al artista desde el menú Compartir de Claude, con permiso de Colaborador (no podrá editar tus datos; solo ver su perfil).",
    "El artista abre el enlace (su solicitud llega sola, sin pulsar nada).",
    `Su solicitud aparece aquí abajo y la asignas a ${artist}.`,
  ],
  pending: (count: number) => `Solicitudes pendientes (${count})`,
  pendingEmpty: "No hay solicitudes pendientes.",
  granted: (count: number) => `Con acceso a este perfil (${count})`,
  grantedEmpty: "Nadie tiene acceso todavía.",
} as const;

/** Textos literales de los borrados de artista (2 pasos) y de movimiento. */
export const DELETE_COPY = {
  artistTitle: (artist: string) => `¿Eliminar a ${artist}?`,
  artistLead: "Se eliminará el artista del roster junto con",
  artistCount: (count: number) => `${count} ${count === 1 ? "movimiento" : "movimientos"}`,
  artistTail: "registrados y se quitará el acceso a su portal.",
  artistIrreversible: "Esta acción no se puede deshacer.",
  continue: "Continuar",
  confirmTitle: "Confirma la eliminación",
  confirmLead: "Para confirmar, escribe el nombre del artista:",
  confirmInput: "Nombre del artista",
  confirmButton: "Eliminar definitivamente",
  movementTitle: "¿Eliminar este movimiento?",
  movementText: (concept: string, amount: string, date: string) =>
    `Se eliminará ${concept} por ${amount} (${date}). Los totales y la distribución del mes se recalcularán. Esta acción no se puede deshacer.`,
  movementButton: "Eliminar",
  movementDrag: "Arrastra para reordenar (o usa ↑ ↓)",
  movementEdit: "Editar movimiento",
  movementRemove: "Eliminar movimiento",
} as const;

/** Pestañas del modal de configuración, en orden. */
export const SETTINGS_TABS = [
  { value: "modelo", label: SETTINGS_MODAL_COPY.tabModel },
  { value: "redes", label: SETTINGS_MODAL_COPY.tabLinks },
] as const;
