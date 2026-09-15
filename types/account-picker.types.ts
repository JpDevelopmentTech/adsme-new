/** Cuenta publicitaria que se puede marcar en el selector. */
export interface AccountPickerOption {
  id: string;
  name: string;
  /** Segunda línea de la fila: identificador y, si la hay, moneda. */
  hint: string;
}

/** Cuentas que cubre el acceso concedido y cuáles están ya conectadas. */
export interface AccountPickerData {
  options: AccountPickerOption[];
  selectedIds: string[];
}

/** Textos con los que cada plataforma rotula su selector. */
export interface AccountPickerCopy {
  title: string;
  subtitle: string;
  /** Explicación distinta cuando el selector lo abre la vuelta del OAuth. */
  pickAfterConnect: string;
  confirm: string;
  cancel: string;
  loading: string;
  empty: string;
  warning: string;
}

export interface AccountMultiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Lo abrió la vuelta del OAuth, no el menú: la explicación cambia. */
  isAfterConnect: boolean;
  copy: AccountPickerCopy;
  /** Consulta las cuentas del acceso; se llama al abrir, no en cada carga. */
  load: () => Promise<AccountPickerData>;
  action: (formData: FormData) => Promise<void>;
}

export interface AccountPickerRowProps {
  option: AccountPickerOption;
  isChecked: boolean;
  onToggle: (accountId: string) => void;
}
