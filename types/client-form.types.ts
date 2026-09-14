import type { RefObject } from "react";
import type {
  Client,
  ClientAvatarGradient,
  ClientKind,
} from "@/domain/entities/client";
import type { StatusTone } from "@/types/ui.types";

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
}

export interface ClientFormProps {
  title: string;
  initialValues: ClientFormValues;
  previewMeta: ClientPreviewMeta;
  initialAvatarUrl?: string | null;
  /** Presente solo al editar; su ausencia hace que la acción dé de alta. */
  clientId?: string;
}

export interface ClientFormHeaderProps {
  title: string;
  isPending: boolean;
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
