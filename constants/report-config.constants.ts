/** Textos del paso 3 del asistente: configuración del reporte del cliente. */
export const STEP_THREE_COPY = {
  cpvSection: "Optimización",
  visibilityCount: (visible: number, total: number) =>
    visible === total
      ? "El cliente ve todo el reporte"
      : `El cliente ve ${visible} de ${total} partes del reporte`,
  cpvToggle: "Optimización de CPV",
  cpvToggleHint:
    "Muestra en el reporte las vistas de YouTube frente a las presupuestadas",
  cpvLabel: "CPV cobrado al cliente",
  cpvPlaceholder: "35",
  cpvUnit: "COP / vista",
  cpvViews: (views: string, investment: string) =>
    `Con la inversión de ${investment} equivale a ${views} vistas.`,
  cpvNoInvestment: "El trabajo aún no tiene inversión para calcular las vistas.",
  saving: "Guardando el reporte",
  saveFailed:
    "No pudimos guardar la configuración del reporte. Inténtalo de nuevo.",
  next: "Siguiente: Enlace",
  // Rótulos de la maqueta `ReportPreviewDevice`.
  platformsTitle: "POR PLATAFORMA",
  previewTitle: "Vista previa en vivo",
  liveReport: "Reporte en vivo",
} as const;

/** Campos del formulario del paso 3. */
export const REPORT_SETTINGS_FIELDS = {
  jobId: "jobId",
  cpvOptimization: "cpvOptimization",
  chargedCpv: "chargedCpv",
} as const;

/** Mensajes de validación del CPV cobrado. */
export const CHARGED_CPV_MESSAGES = {
  required: "Escribe cuánto cobraste por cada vista.",
  format: "Usa solo números, con hasta dos decimales.",
  positive: "El CPV tiene que ser mayor que cero.",
} as const;

export const STEP_FOUR_COPY = {
  shareSection: "Comparte el enlace",
  protectSection: "Protege el reporte",
  shareHint:
    "Compártelo por donde ya hablas con el artista. El código funciona impreso o en pantalla.",
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
