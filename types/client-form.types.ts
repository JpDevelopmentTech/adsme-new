import type { RefObject } from "react";
import type {
  Client,
  ClientAvatarGradient,
  ClientKind,
} from "@/domain/entities/client";
import type { FilterSelectOption, StatusTone } from "@/types/ui.types";

export interface ClientFormValues {
  name: string;
  handle: string;
  kind: ClientKind;
  genre: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
}

/** Datos no editables que la vista previa necesita para verse como la tarjeta real. */
export interface ClientPreviewMeta {
  gradient: ClientAvatarGradient;
  jobsCount: number;
  activeJobsCount: number;
  status: { label: string; tone: StatusTone };
}

export type ClientFormErrors = Partial<Record<keyof ClientFormValues, string>>;

/** Estado devuelto por la Server Action de guardado hacia el formulario. */
export interface ClientFormState {
  message: string | null;
  fieldErrors: ClientFormErrors;
  /** Cliente recién creado por el alta rápida, listo para el selector. */
  created?: FilterSelectOption<string>;
}

export interface ClientFormProps {
  title: string;
  initialValues: ClientFormValues;
  previewMeta: ClientPreviewMeta;
  initialAvatarUrl?: string | null;
  /** Presente solo al editar; su ausencia hace que la acción dé de alta. */
  clientId?: string;
  /** `true` cuando se abre como modal sobre la lista: cerrar vuelve atrás. */
  isModal?: boolean;
}

/** Tarjeta del formulario sin decidir a dónde lleva guardar: la acción viene de fuera. */
export interface ClientFormCardProps extends Omit<ClientFormProps, "isModal"> {
  state: ClientFormState;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  onClose: () => void;
}

/** Alta rápida de cliente desde otro formulario; devuelve el cliente creado. */
export interface ClientCreateDialogProps {
  isOpen: boolean;
  /** Lo que ya se escribió en el buscador: llega como nombre del cliente. */
  initialName: string;
  onClose: () => void;
  onCreated: (client: FilterSelectOption<string>) => void;
}

export interface ClientFormHeaderProps {
  title: string;
  onClose: () => void;
}

export interface ClientFormFooterProps {
  isPending: boolean;
  onClose: () => void;
}

export interface ClientFormFieldsProps {
  values: ClientFormValues;
  errors: ClientFormErrors;
  onChange: <TField extends keyof ClientFormValues>(
    field: TField,
    value: ClientFormValues[TField],
  ) => void;
}

export interface ClientAvatarUploaderProps {
  previewUrl: string | null;
  error: string | null;
  onSelect: (file: File | null) => void;
  /** Ref del input real: su archivo es el que viaja en el envío del formulario. */
  inputRef: RefObject<HTMLInputElement | null>;
}

export interface ClientFormPreviewProps {
  values: ClientFormValues;
  meta: ClientPreviewMeta;
  avatarUrl: string | null;
}

export interface ClientCardMenuProps {
  client: Client;
  /** Lado del cuadrado en px; el diseño usa 32 en la tarjeta del listado. */
  size?: number;
}
