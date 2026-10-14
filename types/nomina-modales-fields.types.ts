import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { NominaChoice } from "@/types/nomina-modales.types";

export interface FieldShellProps {
  /** `id` del control al que apunta la etiqueta; sin él la etiqueta es texto. */
  htmlFor?: string;
  label: string;
  /** Icono antes de la etiqueta, como el logo de una red. */
  labelIcon?: ReactNode;
  /** Aclaración en gris tras la etiqueta («— lo primero que se factura…»). */
  labelExtra?: string;
  /** Acción pequeña a la derecha de la etiqueta. */
  labelAction?: ReactNode;
  hint?: ReactNode;
  error?: string | null;
  warning?: string | null;
  className?: string;
  children: ReactNode;
}

export interface FieldMessageProps {
  tone: "danger" | "warning";
  children: ReactNode;
}

export interface MoneyInputProps {
  id: string;
  /** `null` deja el campo vacío para que se vea el marcador. */
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  /** Sin caja: para escribir dentro de otra caja (bolsas de la distribución). */
  isBare?: boolean;
}

export interface PercentInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  isInvalid?: boolean;
}

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  isInvalid?: boolean;
}

export interface SwitchControlProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  onLabel: string;
  offLabel: string;
}

export interface ChoiceButtonsProps<TValue extends string> {
  label: string;
  value: TValue;
  options: NominaChoice<TValue>[];
  onChange: (value: TValue) => void;
}

export interface SelectInputProps {
  id: string;
  value: string;
  options: NominaChoice<string>[];
  onChange: (value: string) => void;
  placeholder?: string;
  /** Muestra el icono de calendario a la izquierda. */
  hasIcon?: boolean;
}

export interface DateInputProps {
  id: string;
  /** Fecha `AAAA-MM-DD`. */
  value: string;
  onChange: (value: string) => void;
}

export interface FileDropZoneProps {
  id: string;
  fileName: string | null;
  onChange: (fileName: string | null) => void;
  emptyLabel: string;
  changeLabel: string;
}

export interface InfoNoteProps {
  children: ReactNode;
}

export interface TextAreaInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  isInvalid?: boolean;
}
