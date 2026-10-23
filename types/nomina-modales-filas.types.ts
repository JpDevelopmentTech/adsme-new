import type { ReactNode } from "react";

export interface RowIconButtonProps {
  label: string;
  onClick?: () => void;
  icon: ReactNode;
  tone?: "neutral" | "danger";
  /** Cursor de arrastre, para el asa de reordenar. */
  isHandle?: boolean;
}

export interface InlineDeleteButtonProps {
  label: string;
  confirmLabel: string;
  /** Segundo clic: borra de verdad. */
  onConfirm: () => void;
  isPending?: boolean;
}
