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
  /** Icono opcional alineado a la izquierda dentro del campo. */
  leading?: ReactNode;
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

export interface SegmentedControlProps<TValue extends string> {
  /** Nombre accesible del grupo; el control no muestra etiqueta propia. */
  label: string;
  value: TValue;
  options: FilterSelectOption<TValue>[];
  onChange: (value: TValue) => void;
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
  /** Icono que encabeza el diálogo dentro de un cuadro tintado (opcional). */
  icon?: ReactNode;
  /** Tono del cuadro del icono: rojo para borrar, ámbar para lo reversible. */
  tone?: "danger" | "warning";
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

export interface ModalSheetProps {
  isOpen: boolean;
  /** Nombre accesible del diálogo; el contenido pone su propio título visible. */
  label: string;
  onClose: () => void;
  children: ReactNode;
}

export interface ScreenLoaderProps {
  isActive: boolean;
  /** Qué está pasando, en una frase. */
  title: string;
  /** Segunda línea: cuánto tarda o por qué conviene esperar. */
  hint?: string;
}

/** La lámina saca el estado del formulario que la contiene, no de una prop. */
export type FormScreenLoaderProps = Omit<ScreenLoaderProps, "isActive">;

export interface EmptyStatePanelProps {
  icon: ReactNode;
  title: string;
  description: string;
  /** Acción que da la salida: crear lo primero o quitar los filtros. */
  action?: ReactNode;
  /** `true` lo pinta como panel propio; `false`, dentro de otro panel. */
  isStandalone?: boolean;
}

export interface RouteModalProps {
  /** Nombre accesible del diálogo; el contenido pone su propio título visible. */
  label: string;
  children: ReactNode;
}

export interface AmbientGlowProps {
  /** Imagen que se desenfoca para teñir el fondo: la foto o la portada. */
  imageUrl: string | null | undefined;
}

export interface BreadcrumbProps {
  backHref: string;
  backLabel: string;
  /** Nombre de la pantalla actual, tras la barra. */
  current: string;
}

export interface InlineDateFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  id: string;
  /** Rótulo visible delante de la fecha, dentro de la píldora. */
  label: string;
  /** Marca el campo en rojo; el mensaje lo pinta quien agrupa los campos. */
  isInvalid?: boolean;
}

/** Una opción de un grupo de enlaces excluyentes. */
export interface SegmentedLinkItem {
  key: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface SegmentedLinksProps {
  /** Nombre accesible del grupo; el control no muestra etiqueta propia. */
  label: string;
  items: SegmentedLinkItem[];
}

export interface LinkPendingLabelProps {
  children: ReactNode;
}
