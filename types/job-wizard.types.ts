import type { Job } from "@/domain/entities/job";
import type { Campaign } from "@/domain/entities/campaign";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { ReactNode, RefObject } from "react";
import type { JobFormat, JobPlatform } from "@/domain/entities/job";
import type { ReportSection } from "@/domain/entities/report-section";
import type { ReportVisibilityGroup } from "@/types/report-visibility.types";
import type { FilterSelectOption } from "@/types/ui.types";

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

/**
 * Ficha del trabajo que acompaña a todos los pasos. Cada campo es `null`
 * mientras no se haya rellenado: la ficha va completándose a la vista.
 */
export interface JobWizardSummaryData {
  title: string | null;
  clientName: string | null;
  format: string | null;
  coverUrl: string | null;
  period: string | null;
  investment: string | null;
  platforms: string | null;
  report: string | null;
}

export interface JobWizardSummaryProps {
  summary: JobWizardSummaryData;
}

export interface JobWizardLayoutProps {
  currentStep: number;
  skippedSteps?: number[];
  summary: JobWizardSummaryData;
  children: ReactNode;
}

export interface WizardSectionProps {
  label: string;
  /** Con icono, el bloque se titula como pregunta grande; sin él, con un rótulo en versalitas. */
  icon?: ReactNode;
  children: ReactNode;
}

export interface JobWizardPanelProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}

export interface JobBasicsFieldsProps {
  values: JobBasicsValues;
  errors: JobBasicsErrors;
  clientOptions: FilterSelectOption<string>[];
  /** Portada elegida, para la caja de subida. */
  cover: JobCoverUploaderProps;
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
  initialValues: JobBasicsValues;
  /** Presente solo al editar; su ausencia hace que la acción dé de alta. */
  jobId?: string;
  initialCoverUrl?: string | null;
}

/** Qué debe pasar tras guardar: quedarse en el listado o seguir al paso 2. */
export type JobWizardIntent = "draft" | "next";

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

export interface PlatformCampaignRowProps {
  platform: ConnectionPlatform;
  label: string;
  /** Hay al menos una cuenta de esa plataforma vinculada. */
  isConnected: boolean;
  /** Campañas importadas de sus cuentas, sobre las que busca el usuario. */
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

export interface ReportSettingsFormProps {
  jobId: string;
  /** Inversión del trabajo, para traducir el CPV a vistas mientras se escribe. */
  investment: number;
  cpvOptimization: boolean;
  chargedCpv: number | null;
  /** Secciones que el cliente no ve, tal como están guardadas. */
  hiddenSections: ReportSection[];
  /** Ruta del paso anterior, para el botón «Atrás». */
  previousHref: string;
}

/** Estado devuelto por la Server Action del paso 3 hacia el formulario. */
export interface ReportSettingsFormState {
  message: string | null;
  chargedCpvError: string | null;
}

export interface CpvChargeFieldProps {
  defaultValue: string;
  investment: number;
  error: string | null;
}

export interface ReportVisibilityGroupCardProps {
  group: ReportVisibilityGroup;
  hiddenSections: ReportSection[];
  onToggle: (section: ReportSection, isVisible: boolean) => void;
}

export interface CpvOptimizationSectionProps {
  cpvOptimization: boolean;
  chargedCpv: number | null;
  investment: number;
  error: string | null;
}

export interface WizardBackLinkProps {
  /** Paso o pantalla al que vuelve. */
  href: string;
}
