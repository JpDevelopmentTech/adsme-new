import type {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/** Superficie del campo: `card` sobre el fondo base, `elevated` dentro de una tarjeta. */
export type FieldSurface = "card" | "elevated";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  id: string;
  name: string;
  label: string;
  error?: string;
  surface?: FieldSurface;
  /** Elemento opcional alineado a la derecha dentro del campo (iconos, acciones). */
  trailing?: ReactNode;
}

/** Opción de un `<select>`: una cadena cuando valor y etiqueta coinciden. */
export type SelectOption = string | { value: string; label: string };

export interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  id: string;
  name: string;
  label: string;
  options: readonly SelectOption[];
  /** Opción inicial deshabilitada que actúa de marcador. */
  placeholder?: string;
  error?: string;
  surface?: FieldSurface;
}

export interface SearchableSelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  /** Valor preseleccionado al abrir el formulario en modo edición. */
  defaultValue?: string;
  placeholder: string;
  error?: string;
  surface?: FieldSurface;
  isClearable?: boolean;
}

export interface DateFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  id: string;
  name: string;
  /** Etiqueta accesible; el diseño no la muestra sobre cada fecha del período. */
  label: string;
  error?: string;
  surface?: FieldSurface;
}

export interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  id: string;
  name: string;
  label: string;
  error?: string;
  surface?: FieldSurface;
}

export interface CurrencyFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  id: string;
  name: string;
  label: string;
  /** Símbolo de la moneda, delante del importe. */
  symbol: string;
  /** Código mostrado al final del campo, como «COP». */
  currency: string;
  /** Aclaración al lado del campo; no sustituye a la etiqueta. */
  hint?: string;
  error?: string;
  surface?: FieldSurface;
}

export type PasswordFieldProps = Omit<TextFieldProps, "type" | "trailing">;

export interface CheckboxFieldProps {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export interface IconButtonLikeProps extends ButtonProps {
  icon: ReactNode;
}

export interface FormDividerProps {
  label: string;
}

export interface FormAlertProps {
  message: string;
  tone?: "danger" | "warning";
}

export interface FilterChipProps {
  label: string;
  /** Icono a la derecha; por defecto el chevron del componente del diseño. */
  icon?: ReactNode;
}

export interface SearchFieldProps {
  /** Término vigente según la URL; el input se sincroniza con él. */
  value: string;
  /** Parámetro de la URL donde se escribe lo buscado. */
  paramName: string;
  placeholder: string;
}

export interface FilterSelectOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface FilterSelectProps<TValue extends string> {
  /** Texto antes del valor, como «Estado». Sin él solo se muestra la opción. */
  prefix?: string;
  value: TValue;
  options: FilterSelectOption<TValue>[];
  /** Valor considerado neutro; con él el chip no se resalta. */
  defaultValue: TValue;
  icon?: ReactNode;
  /** Lado por el que se alinea el panel; «end» evita que se salga por la derecha. */
  align?: "start" | "end";
  onChange: (value: TValue) => void;
  /** Con él, un filtro aplicado muestra una «×» que lo devuelve al valor neutro. */
  onClear?: () => void;
}

export interface CopyCodeChipProps {
  /** Parte legible que se muestra, como el código corto de un enlace. */
  code: string;
  /** Texto completo que se copia al portapapeles. */
  value: string;
  label: string;
}

export interface SegmentedControlProps<TValue extends string> {
  /** Nombre accesible del grupo; el control no muestra etiqueta propia. */
  label: string;
  value: TValue;
  options: FilterSelectOption<TValue>[];
  onChange: (value: TValue) => void;
}

export interface StatStripItem {
  /** Cifra ya formateada; el componente no interpreta números. */
  value: string;
  label: string;
}

export interface StatStripProps {
  items: StatStripItem[];
}

export type StatusTone =
  | "success"
  | "muted"
  | "warning"
  | "danger"
  | "brand"
  | "info";

export interface StatusBadgeProps {
  label: string;
  tone: StatusTone;
}

export interface TagPillProps {
  label: string;
}

export interface PlatformIconProps {
  /** Lado del cuadrado en px; el diseño usa 15 dentro de las píldoras de la tabla. */
  size?: number;
}

export interface CopyLinkFieldProps {
  /** Enlace mostrado y copiado al portapapeles. */
  url: string;
  /** Texto accesible del botón de copiado. */
  label: string;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  onCancel: () => void;
  /** Control que confirma la acción; normalmente el submit de un formulario. */
  children: ReactNode;
}

export interface SecondaryLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  /** Texto accesible; el botón solo muestra el icono. */
  label: string;
  /** Lado del cuadrado en px; el diseño usa 40 por defecto y 34 en las tarjetas. */
  size?: number;
}

export interface DropdownMenuProps {
  /** Contenido del disparador; recibe el estado abierto para reflejarlo visualmente. */
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  /** Lado por el que se despliega el panel respecto al disparador. */
  side?: "top" | "bottom";
  label: string;
}

export interface BackLinkProps {
  href: string;
  label: string;
}

export interface ToggleSwitchProps {
  id: string;
  name: string;
  label: string;
  /** Segunda línea explicativa; el diseño la omite en las métricas. */
  description?: string;
  defaultChecked?: boolean;
  /** Para revelar los campos que dependen del interruptor. */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ToggleGroupProps {
  title: string;
  children: ReactNode;
}
