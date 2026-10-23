/** Textos comunes de los modales de la nómina. */
export const MODAL_COMMON_COPY = {
  cancel: "Cancelar",
  close: "Cerrar",
  save: "Guardar",
  saveChanges: "Guardar cambios",
  saving: "Guardando…",
  removing: "Eliminando…",
  money: "$",
  percent: "%",
} as const;

/** Textos literales del modal «Nuevo artista». */
export const NEW_ARTIST_COPY = {
  title: "Nuevo artista",
  subtitle: "Alta de artista con su configuración inicial",
  name: "Nombre del artista",
  namePlaceholder: "Ej. Kali Uchis",
  duplicate: "Ya existe un artista con ese nombre.",
  nomina: "Nómina (COP)",
  nominaPlaceholder: "$300.000",
  nominaHelp: "Mínimo permitido: $200.000 COP. El modelo no es viable por debajo de ese monto.",
  nominaError: "La nómina mínima viable es $200.000 COP.",
  minShows: "Mínimo de Shows",
  minShowsSuggested: (shows: number) => `Sugerido por la nómina: ${shows} shows. Cámbialo si este artista tiene otra meta.`,
  minShowsAuto: "Se calcula automáticamente al ingresar la nómina.",
  minShowsDeviation: (shows: number) => `Te estás desviando del mínimo sugerido por el sistema (${shows} shows).`,
  threshold: "Umbral (Punto de Equilibrio)",
  thresholdHelp: "Automático: Mínimo de Shows × Nómina.",
  express: "¿Aplica Express?",
  expressOn: "Sí, aplica Express",
  expressOff: "No aplica",
  expressDetail: "Detalle del Express",
  expressAmount: "Monto de entrada aceptado",
  expressOther: "Otro monto...",
  expressHelp: "Elige un monto base o ingresa otro: Inversión, Servicio y Utilidad se calculan solos y puedes ajustarlos.",
  expressOtherPlaceholder: "$3.000.000",
  expressReference:
    "Calculado con la nómina de referencia de $300.000. Ingresa la nómina del artista y se recalcula automáticamente.",
  coveredMonth: "Mes que está cubriendo",
  monthPlaceholder: "Selecciona el mes",
  coveredMonthEmpty: "Elige el mes que se está saldando con este Express para poder guardar.",
  coveredMonthHelp: "El mes que se salda. El dinero queda disponible para gastar este mes.",
  startDate: "Fecha de inicio de vigencia",
  startDateHelp: "Desde qué fecha empieza a operar esta configuración. Si no eliges ninguna, se usa hoy.",
  initialStateLead: "El artista se guardará con estado",
  initialStateStrong: "inicial (rojo)",
  initialStateTail: "— sin actividad ni Ads activos todavía.",
} as const;

/** Ayudas y errores de la foto del artista. */
export const ARTIST_PHOTO_COPY = {
  upload: "Subir foto del artista",
  uploadTitle: "Subir, arrastrar o pegar la foto",
  help:
    "Foto: haz clic en el círculo, arrastra una imagen o pégala (Ctrl/⌘ + V). Spotify no deja traerla automáticamente: en su perfil, clic derecho sobre la foto del artista → Copiar imagen.",
  remove: "Quitar foto",
  notImage: "Ese archivo no es una imagen.",
  unreadable: "No se pudo leer la imagen. Prueba con un JPG o PNG.",
} as const;
