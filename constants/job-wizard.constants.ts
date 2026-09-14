import type { JobFormat } from "@/domain/entities/job";
import type { JobBasicsValues } from "@/types/job-wizard.types";

/** Los cuatro pasos del asistente, con la etiqueta que muestra `B6`. */
export const JOB_WIZARD_STEPS = [
  { number: 1, label: "Datos básicos" },
  { number: 2, label: "Campañas" },
  { number: 3, label: "Reporte del cliente" },
  { number: 4, label: "Enlace" },
] as const;

export const JOB_FORMATS = ["Single", "EP", "Álbum"] as const satisfies readonly JobFormat[];

export const JOB_WIZARD_COPY = {
  back: "Trabajos",
  title: "Nuevo trabajo",
  editTitle: "Editar trabajo",
  saveDraft: "Guardar borrador",
  coverLabel: "Portada de la canción",
  coverTitle: "Arrastra la portada aquí",
  coverHint: "o haz clic para explorar · JPG/PNG/WebP · 1400×1400 px",
  coverRemove: "Quitar portada",
  titleLabel: "Nombre de la canción",
  titlePlaceholder: "Corazón de Neón",
  clientLabel: "Cliente / Artista",
  clientPlaceholder: "Selecciona un cliente",
  formatLabel: "Tipo de lanzamiento",
  periodLabel: "Período de la campaña",
  startLabel: "Inicio de la campaña",
  endLabel: "Fin de la campaña",
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
  empty: "Ninguna campaña vinculada aún. Busca por ID o etiqueta para asociarla.",
  emptyDisconnected: (platform: string) =>
    `No hay ninguna cuenta de ${platform} conectada.`,
  next: "Siguiente: Enlace",
  skippedStep:
    "La configuración del reporte llega más adelante: por ahora el asistente pasa directo al enlace del cliente.",
} as const;
