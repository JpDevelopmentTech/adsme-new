export const STEP_THREE_COPY = {
  subtitle:
    "Activa lo que verá el cliente en su reporte. Puedes cambiarlo después sin volver a compartir el enlace.",
  platformsTitle: "POR PLATAFORMA",
  previewTitle: "Vista previa en vivo",
  liveReport: "Reporte en vivo",
  next: "Siguiente: Enlace",
} as const;

/** Secciones y métricas configurables, con su estado inicial según el diseño. */
export const REPORT_SECTIONS = [
  {
    title: "SECCIONES DEL REPORTE",
    options: [
      { id: "summary", label: "Resumen general", on: true },
      { id: "chart", label: "Gráfico de evolución", on: true },
      { id: "platforms", label: "Desglose por plataforma", on: true },
      { id: "comparison", label: "Comparativa de campañas", on: false },
      { id: "notes", label: "Comentarios del equipo", on: false },
    ],
  },
  {
    title: "MÉTRICAS · YOUTUBE",
    options: [
      { id: "yt-views", label: "Vistas", on: true },
      { id: "yt-ctr", label: "CTR", on: true },
      { id: "yt-cpv", label: "Costo por vista", on: false },
    ],
  },
  {
    title: "MÉTRICAS · META Y TIKTOK",
    options: [
      { id: "reach", label: "Alcance e impresiones", on: true },
      { id: "spend", label: "Inversión total", on: true },
      { id: "engagement", label: "Interacciones", on: true },
      { id: "cpr", label: "Costo por resultado", on: false },
    ],
  },
] as const;

export const STEP_FOUR_COPY = {
  successTitle: "El enlace del cliente está listo",
  successBody: (client: string) =>
    `Se activa al publicar el trabajo. ${client} verá los datos actualizados cada hora, sin crear una cuenta.`,
  reviewTitle: "ESTO ES LO QUE SE VA A PUBLICAR",
  urlLabel: "Enlace único del cliente",
  copy: "Copiar",
  whatsapp: "WhatsApp",
  email: "Correo",
  downloadQr: "Descargar QR",
  scan: "Escanea para abrir",
  finish: "Finalizar y publicar",
  noLink: "Este trabajo todavía no tiene enlace de reporte.",
  save: "Guardar protección",
  saved: "Protección guardada.",
  saveFailed: "No pudimos guardar la protección del enlace.",
  passwordPlaceholder: "Clave para abrir el reporte",
  generate: "Generar",
  expiryHint: "Después de esa fecha el enlace deja de abrirse.",
  protectedNote: (date: string) => `Caduca el ${date}`,
  whatsappMessage: (job: string, url: string) =>
    `Te comparto el reporte en vivo de ${job}: ${url}`,
} as const;

/** Identificador del contenedor del QR, del que se lee el SVG al descargarlo. */
export const QR_ELEMENT_ID = "report-qr";

/** Lado del PNG descargado; suficiente para imprimirlo sin que pixele. */
export const QR_DOWNLOAD_SIZE = 1024;

/** Campos del formulario de protección del enlace. */
export const LINK_FORM_FIELDS = {
  jobId: "jobId",
  passwordEnabled: "passwordEnabled",
  password: "password",
  expiryEnabled: "expiryEnabled",
  expiresOn: "expiresOn",
} as const;

/** Opciones del enlace que el diseño muestra apagadas. */
export const LINK_OPTIONS = [
  {
    id: "password",
    label: "Proteger con contraseña",
    description: "Solo quien tenga la clave podrá ver el reporte",
  },
  {
    id: "expiry",
    label: "Programar expiración",
    description: "El enlace dejará de funcionar en la fecha elegida",
  },
] as const;
