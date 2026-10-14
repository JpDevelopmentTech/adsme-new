import type { ReactNode } from "react";

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  closeLabel: string;
  onClose: () => void;
}

export interface FormModalProps extends ModalHeaderProps {
  isOpen: boolean;
  /** Ancho de la lámina (clases de Tailwind). */
  widthClassName?: string;
  /** Contenido entre la cabecera y el cuerpo, como unas pestañas. */
  headerExtra?: ReactNode;
  submitLabel: string;
  cancelLabel: string;
  isSubmitDisabled?: boolean;
  onSubmit: () => void;
  children: ReactNode;
}

export interface ModalFooterProps {
  submitLabel: string;
  cancelLabel: string;
  isSubmitDisabled?: boolean;
  onCancel: () => void;
}

export interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  /** Icono del cuadro tintado de rojo que encabeza el diálogo. */
  icon: ReactNode;
  title: string;
  description: ReactNode;
  /** Contenido extra bajo la descripción, como un campo de confirmación. */
  children?: ReactNode;
  /** Botones de la derecha (cancelar y confirmar). */
  actions: ReactNode;
}
