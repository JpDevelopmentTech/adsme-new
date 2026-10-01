import type { JobFormat } from "@/domain/entities/job";
import type { JobBasicsValues } from "@/types/job-wizard.types";

/**
 * Los cuatro pasos del asistente. `note` sirve para avisar en el propio
 * indicador cuando un paso se configura en otro momento.
 */
export const JOB_WIZARD_STEPS: readonly {
  number: number;
  label: string;
  note: string | null;
}[] = [
  { number: 1, label: "Datos básicos", note: null },
  { number: 2, label: "Campañas", note: null },
  { number: 3, label: "Reporte del cliente", note: null },
  { number: 4, label: "Enlace", note: null },
];

/** Los tres bloques en que se agrupan los campos del paso 1. */
export const JOB_WIZARD_SECTIONS = {
  what: "Qué se lanza",
  when: "Cuándo corre la pauta",
  howMuch: "Cuánto se invierte",
} as const;

/** Ficha lateral que acompaña a todos los pasos. */
export const JOB_WIZARD_SUMMARY = {
  eyebrow: "Así va el trabajo",
  untitled: "Trabajo sin nombre",
  noClient: "Sin cliente",
  pending: "Pendiente",
  period: "Período",
  investment: "Inversión",
  platforms: "Pauta",
  report: "Reporte",
  reportReady: "Enlace listo",
  platformsCount: (linked: number, total: number) =>
    `${linked} de ${total} plataformas`,
  note: "Puedes guardar como borrador y seguir en otro momento.",
} as const;

/** Título y subtítulo del panel de cada paso. */
export const JOB_STEP_COPY = {
  one: {
    title: "Datos básicos",
    subtitle:
      "Lo mínimo para poder empezar a pautar. Todo se puede editar después.",
  },
  two: {
    title: "Campañas",
    subtitle:
      "Vincula la campaña de cada plataforma que quieras incluir. La inversión se repartirá entre las que actives.",
  },
  three: {
    title: "Reporte del cliente",
    subtitle:
      "Elige qué ve el artista al abrir su enlace. Puedes cambiarlo después sin volver a compartirlo.",
  },
  four: {
    title: "Enlace del cliente",
    subtitle:
      "Esto es lo que recibe el artista. Se abre sin cuenta y se actualiza solo.",
  },
} as const;

export const JOB_FORMATS = ["Single", "EP", "Álbum"] as const satisfies readonly JobFormat[];

export const JOB_WIZARD_COPY = {
  /** Rótulo sobre el nombre de cada paso en el indicador de progreso. */
  stepEyebrow: (number: number) => `Paso ${number}`,
  back: "Trabajos",
  title: "Nuevo trabajo",
  editTitle: "Editar trabajo",
  saveDraft: "Guardar borrador",
  coverLabel: "Portada de la canción",
  coverTitle: "Arrastra la portada",
  coverHint: "JPG · PNG · 1400 px",
  coverRemove: "Quitar portada",
  titleLabel: "Nombre de la canción",
  titlePlaceholder: "Corazón de Neón",
  clientLabel: "Cliente / Artista",
  clientPlaceholder: "Selecciona un cliente",
  formatLabel: "Tipo de lanzamiento",
  periodLabel: "Período de la campaña",
  startLabel: "Inicio",
  endLabel: "Fin",
  investmentLabel: "Inversión en pauta",
  investmentHint: "Se reparte entre las plataformas que incluyas en el paso 2.",
  investmentCurrency: "COP",
  descriptionLabel: "Descripción (opcional)",
  descriptionPlaceholder:
    "Lanzamiento principal del sencillo. Enfoque en audiencia joven 18–34 en Colombia y México.",
  previous: "Atrás",
  next: "Siguiente: Campañas",
  stepOneDone:
    "Datos básicos completos. El paso 2 (Campañas) todavía no está implementado.",
  noClients:
    "Necesitas al menos un cliente para crear un trabajo. Crea uno primero.",
} as const;

/** Nombres de los campos auxiliares del asistente dentro del FormData. */
export const JOB_FORM_FIELDS = {
  jobId: "jobId",
  cover: "cover",
  previousCoverUrl: "previousCoverUrl",
  removeCover: "removeCover",
} as const;

export const EMPTY_JOB_VALUES: JobBasicsValues = {
  title: "",
  clientId: "",
  format: "Single",
  startsOn: "",
  endsOn: "",
  investment: "",
  description: "",
};

/** Etiquetas del resumen previo a publicar, en el paso 4. */
export const JOB_REVIEW_LABELS = {
  song: "Canción",
  client: "Cliente",
  period: "Período",
  investment: "Inversión",
  platforms: "Plataformas",
  report: "Reporte",
  noPlatforms: "Sin plataformas",
} as const;

export const JOB_MENU_COPY = {
  edit: "Editar trabajo",
  delete: "Eliminar",
  /** Botón del diálogo: nombra la acción, no un «Sí» genérico (NN/g). */
  confirmDelete: "Eliminar trabajo",
  cancel: "Cancelar",
  deleteTitle: "Eliminar trabajo",
  deleteDescription: (title: string) =>
    `Se eliminará «${title}» junto con su portada. Esta acción no se puede deshacer.`,
} as const;

/** Textos del paso 2 del asistente (`B6 · Wizard Paso 2`). */
export const STEP_TWO_COPY = {
  subtitle:
    "Vincula la campaña de cada plataforma que quieras incluir en este trabajo. La inversión se repartirá entre las que actives.",
  connected: "Cuenta conectada",
  notConnected: "Sin cuenta conectada",
  connectAccount: "Conectar cuenta",
  searchPlaceholder: "ID o etiqueta de campaña",
  link: "Vincular",
  linked: "Vinculada",
  linkedHint: "campaña vinculada a este trabajo",
  linkedCount: (count: number) =>
    count === 1 ? "1 campaña vinculada" : `${count} campañas vinculadas`,
  empty: "Ninguna campaña vinculada aún. Busca por ID o etiqueta para asociarla.",
  emptyDisconnected: (platform: string) =>
    `No hay ninguna cuenta de ${platform} conectada.`,
  next: "Siguiente: Reporte",
  note:
    "Puedes dejar plataformas sin vincular y añadirlas más adelante desde el trabajo.",
} as const;
