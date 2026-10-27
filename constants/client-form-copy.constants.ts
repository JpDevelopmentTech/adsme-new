/** Textos de `B4 · Cliente Crear/Editar`. */
export const CLIENT_FORM_COPY = {
  back: "Clientes",
  createTitle: "Nuevo cliente",
  editTitle: "Editar cliente",
  cancel: "Cancelar",
  save: "Guardar cliente",
  sectionClient: "Información del cliente",
  sectionContact: "Contacto",
  avatarTitle: "Logo o foto",
  avatarHint:
    "Arrastra una imagen o haz clic para subir. JPG, PNG o WebP, máx. 4 MB. Recomendado 400×400 px.",
  avatarUpload: "Subir",
  avatarRemove: "Quitar foto",
  previewTitle: "Vista previa",
  previewNote: "Así se mostrará el cliente en la lista una vez guardado.",
  previewNewStatus: "Nuevo",
  nameLabel: "Nombre",
  namePlaceholder: "Café Origen",
  handleLabel: "Usuario",
  handlePlaceholder: "cafeorigen",
  kindLabel: "Tipo",
  genreLabel: "Sector",
  genrePlaceholder: "Elige el sector",
  emailLabel: "Correo electrónico",
  emailPlaceholder: "contacto@cafeorigen.co",
  phoneLabel: "Teléfono",
  phonePlaceholder: "+57 301 555 0142",
  cityLabel: "Ciudad",
  cityPlaceholder: "Medellín",
  countryLabel: "País",
  notesLabel: "Notas internas",
  notesPlaceholder:
    "Contacto: Daniela Torres, jefa de mercadeo. Prefiere reportes semanales los lunes.",
  notPersistedNotice:
    "Los datos son válidos, pero el guardado todavía no está conectado a la base de datos.",
} as const;

export const AVATAR_ERRORS = {
  type: (actualType: string) =>
    `Solo se admiten imágenes JPG, PNG o WebP${actualType ? ` (recibido: ${actualType})` : ""}.`,
  size: "La imagen supera los 4 MB.",
} as const;
