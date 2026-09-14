/** Textos de `B4 · Cliente Crear/Editar`. */
export const CLIENT_FORM_COPY = {
  back: "Clientes",
  createTitle: "Nuevo cliente",
  editTitle: "Editar cliente",
  cancel: "Cancelar",
  save: "Guardar cliente",
  sectionArtist: "Información del artista",
  sectionContact: "Contacto",
  avatarTitle: "Foto de perfil del artista",
  avatarHint:
    "Arrastra una imagen o haz clic para subir. JPG, PNG o WebP, máx. 4 MB. Recomendado 400×400 px.",
  avatarUpload: "Subir",
  avatarRemove: "Quitar foto",
  previewTitle: "Vista previa",
  previewNote: "Así se mostrará el cliente en la lista una vez guardado.",
  previewNewStatus: "Nuevo",
  nameLabel: "Nombre artístico",
  namePlaceholder: "Sofía Vega",
  handleLabel: "Usuario",
  handlePlaceholder: "@sofiavega",
  kindLabel: "Tipo",
  genreLabel: "Género musical",
  emailLabel: "Correo electrónico",
  emailPlaceholder: "sofia@vegamusic.co",
  phoneLabel: "Teléfono",
  phonePlaceholder: "+57 301 555 0142",
  cityLabel: "Ciudad",
  cityPlaceholder: "Medellín",
  countryLabel: "País",
  notesLabel: "Notas internas",
  notesPlaceholder:
    "Manager: Daniela Torres. Prefiere reportes semanales los lunes.",
  notPersistedNotice:
    "Los datos son válidos, pero el guardado todavía no está conectado a la base de datos.",
} as const;

export const AVATAR_ERRORS = {
  type: (actualType: string) =>
    `Solo se admiten imágenes JPG, PNG o WebP${actualType ? ` (recibido: ${actualType})` : ""}.`,
  size: "La imagen supera los 4 MB.",
} as const;
