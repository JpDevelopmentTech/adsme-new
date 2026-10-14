import type { NominaExpenseTarget } from "@/domain/entities/nomina-expense";

/** Textos literales del modal «Nuevo / Editar Gasto» y su borrado en línea. */
export const EXPENSE_MODAL_COPY = {
  newTitle: "Nuevo Gasto",
  openFor: (artist: string) => `Nuevo gasto de ${artist}`,
  editTitle: "Editar Gasto",
  subtitle: (artist: string) => `Pago de Servicio o a un proveedor · ${artist}`,
  submitNew: "Guardar Gasto",
  type: "Tipo de gasto",
  concept: "Concepto",
  conceptPlaceholder: "Ej. Playlist Pop Latino",
  conceptHelp: "Editable: escribe lo que quieras o elige uno que ya usaste.",
  provider: "Proveedor (opcional)",
  providerPlaceholder: "Ej. Nombre del curador o agencia",
  amount: "Monto del gasto",
  amountPlaceholder: "$500.000",
  target: "Se descuenta de",
  date: "Fecha del gasto",
  dateHelp: "Por defecto, hoy.",
  month: "Mes al que se asigna",
  monthHelp: "Por defecto, el mes de la fecha.",
  description: "Descripción (opcional)",
  descriptionPlaceholder: "Ej. Campaña de 30 días en playlists de pop",
  edit: (concept: string) => `Editar gasto ${concept}`,
  remove: (concept: string) => `Eliminar gasto ${concept}`,
  confirmRemove: "¿Eliminar?",
} as const;

/** Ayuda de «Se descuenta de» según el destino elegido. */
export const EXPENSE_TARGET_HELP: Record<NominaExpenseTarget, string> = {
  ads: "Se descuenta del Presupuesto Disponible y suma a Inversión (Ads) consumida.",
  servicio: "Es un pago del costo de Servicio: queda registrado y no toca el presupuesto de Ads.",
};
