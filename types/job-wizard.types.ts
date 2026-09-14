import type { Job } from "@/domain/entities/job";
import type { Campaign } from "@/domain/entities/campaign";
import type { Connection, ConnectionPlatform } from "@/domain/entities/connection";
import type { RefObject } from "react";
import type { JobFormat, JobPlatform } from "@/domain/entities/job";
import type { FilterSelectOption, StatStripItem } from "@/types/ui.types";

export interface JobBasicsValues {
  title: string;
  clientId: string;
  format: JobFormat;
  startsOn: string;
  endsOn: string;
  /** Se edita como texto para poder formatearlo con separadores de miles. */
  investment: string;
  description: string;
}

export type JobBasicsErrors = Partial<Record<keyof JobBasicsValues, string>>;

export interface JobWizardStepperProps {
  /** Paso vigente, empezando en 1. */
  currentStep: number;
  /** Pasos que el asistente se salta; se marcan como pendientes, no cumplidos. */
  skippedSteps?: number[];
}

export interface JobBasicsFieldsProps {
  values: JobBasicsValues;
  errors: JobBasicsErrors;
  clientOptions: FilterSelectOption<string>[];
  onChange: <TField extends keyof JobBasicsValues>(
    field: TField,
    value: JobBasicsValues[TField],
  ) => void;
}

/** Estado devuelto por la Server Action del asistente hacia el formulario. */
export interface JobFormState {
  message: string | null;
  fieldErrors: JobBasicsErrors;
}

export interface JobBasicsFormProps {
  /** Clientes disponibles para asociar el trabajo, tomados de Supabase. */
  clientOptions: FilterSelectOption<string>[];
  title: string;
  initialValues: JobBasicsValues;
  /** Presente solo al editar; su ausencia hace que la acción dé de alta. */
  jobId?: string;
  initialCoverUrl?: string | null;
}

/** Qué debe pasar tras guardar: quedarse en el listado o seguir al paso 2. */
export type JobWizardIntent = "draft" | "next";

export interface JobWizardHeaderProps {
  title: string;
  isPending: boolean;
  onIntent: (intent: JobWizardIntent) => void;
}

export interface JobWizardFooterProps {
  isPending: boolean;
  onIntent: (intent: JobWizardIntent) => void;
}

export interface JobCoverUploaderProps {
  previewUrl: string | null;
  error: string | null;
  onSelect: (file: File | null) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export interface PlatformCampaignCardProps {
  platform: ConnectionPlatform;
  label: string;
  /** Conexión de esa plataforma, o `null` si la cuenta no está vinculada. */
  connection: Connection | null;
  /** Campañas importadas de esa cuenta, sobre las que busca el usuario. */
  campaigns: Campaign[];
  /** Campañas ya asociadas a este trabajo. */
  linked: Campaign[];
  jobId: string;
}

/** Parte de la inversión del trabajo que se lleva una de sus plataformas. */
export interface JobPlatformSplit {
  platform: JobPlatform;
  amount: number;
  percent: number;
}

export interface ReportPreviewDeviceProps {
  job: Job;
  clientName: string;
  /** KPIs de la maqueta, en el orden del diseño. */
  kpis: { value: string; label: string }[];
  /** Reparto por plataforma; vacío si el trabajo no incluye ninguna. */
  platforms: JobPlatformSplit[];
}

export interface JobPublishReviewProps {
  items: StatStripItem[];
}

export interface ReportLinkProtectionFormProps {
  jobId: string;
  /** El enlace ya tiene clave; el campo no la muestra, solo permite cambiarla. */
  hasPassword: boolean;
  /** Fecha de caducidad en formato `YYYY-MM-DD`, o null si no caduca. */
  expiresOn: string | null;
}

export interface ReportProtectionState {
  hasPassword: boolean;
  expiresOn: string | null;
}

export interface DownloadQrButtonProps {
  /** Nombre del archivo descargado, sin extensión. */
  fileName: string;
}

export interface ReportQrProps {
  /** Enlace que codifica el QR; es el mismo que se comparte con el cliente. */
  url: string;
}
