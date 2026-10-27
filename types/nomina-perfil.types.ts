import type { LucideIcon } from "lucide-react";
import type { ChangeEvent, ReactNode, RefObject } from "react";
import type { NominaShowProgress } from "@/domain/entities/nomina-artist";
import type { NominaBucketAmount, NominaBucketKey, NominaDailyPoint } from "@/domain/entities/nomina-bucket";
import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";
import type { NominaExpense, NominaExpenseTarget } from "@/domain/entities/nomina-expense";
import type { NominaMovement, NominaMovementTotals } from "@/domain/entities/nomina-movement";
import type { NominaArtistProfile, NominaBudgetMonth } from "@/domain/entities/nomina-profile";
import type { NominaSocialLink, NominaSocialNetwork } from "@/domain/entities/nomina-social";
import type { NominaModalArtist } from "@/types/nomina-modals.types";
import type { ProfitLevel } from "@/types/nomina-ui.types";

/** Pestañas del perfil, tal como viajan en `?pestana=`. */
export type ProfileTab = "finanzas" | "historico" | "ads" | "optimizacion" | "legal";

/** Lo común a las piezas del perfil que cambian en el portal de solo lectura. */
export interface ReadOnlyAware {
  /** Portal del artista: sin acciones de edición. */
  isReadOnly?: boolean;
}

export interface ArtistProfileViewProps extends ReadOnlyAware {
  profile: NominaArtistProfile;
  tab: ProfileTab;
  /** Ruta del perfil sin la pestaña: la del panel o la del portal. */
  basePath: string;
}

export interface ProfileTabContentProps extends ReadOnlyAware {
  profile: NominaArtistProfile;
  tab: ProfileTab;
}

export interface ProfileHeaderProps extends ReadOnlyAware {
  profile: NominaArtistProfile;
}

export interface ProfilePhotoProps extends ReadOnlyAware {
  clientId: string;
  name: string;
  photoUrl: string | null;
  semaphore: NominaArtistProfile["semaphore"];
}

/** Foto del perfil que se puede cambiar (solo en el panel, no en el portal). */
export type EditableProfilePhotoProps = Omit<ProfilePhotoProps, "isReadOnly">;

/** Estado del cambio de foto: selector oculto, previsualización y resultado. */
export interface ArtistPhotoUploadState {
  inputRef: RefObject<HTMLInputElement | null>;
  previewUrl: string | null;
  error: string | null;
  isPending: boolean;
  pick: () => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialBarProps extends ReadOnlyAware {
  socials: NominaSocialLink[];
}

export interface SocialLinkButtonProps {
  link: NominaSocialLink;
}

export interface SocialIconProps {
  network: NominaSocialNetwork;
  /** Color del trazo: el de la marca o el gris de «sin enlace». */
  color: string;
}

export interface BrandIconProps {
  color: string;
  size?: number;
}

export interface ProfileKpisProps {
  profile: NominaArtistProfile;
}

export interface StatusKpiCardProps {
  scalability: NominaArtistProfile["scalability"];
  margin: number | null;
  level: ProfitLevel;
}

export interface ProfitBarProps {
  margin: number;
  /** Color del marcador y la cifra: el del nivel de rentabilidad. */
  color: string;
}

export interface ScalabilityKpiCardProps {
  progress: NominaShowProgress;
}

export interface ProfitKpiCardProps {
  profit: number;
  goal: number | null;
}

export interface ProfitGoalMeterProps {
  profit: number;
  goal: number;
}

export interface ProfileToolbarProps {
  tabs: ReactNode;
  actions?: ReactNode;
  /** Mes en curso `AAAA-MM`; el botón alterna con el anterior. */
  currentMonth: string;
}

export interface MonthButtonProps {
  label: string;
  isHistoric: boolean;
  onToggle: () => void;
}

export interface HistoricMonthBannerProps {
  monthLabel: string;
  onBack: () => void;
}

export interface MovementsPanelProps extends ReadOnlyAware {
  artist: NominaModalArtist;
  movements: NominaMovement[];
  totals: NominaMovementTotals;
}

export interface MovementsTableProps extends ReadOnlyAware {
  artist: NominaModalArtist;
  movements: NominaMovement[];
  totals: NominaMovementTotals;
}

export interface MovementRowProps extends ReadOnlyAware {
  artist: NominaModalArtist;
  movement: NominaMovement;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export interface MovementDetailProps {
  movement: NominaMovement;
}

export interface DetailBoxProps {
  bucket: NominaBucketKey;
  label: string;
  amount: number;
  total: number;
}

export interface MovementTotalsProps {
  totals: NominaMovementTotals;
}

export interface TotalFigureProps {
  label: string;
  title: string;
  amount: number;
  color?: string;
}

export interface ExpensesPanelProps extends ReadOnlyAware {
  artist: NominaModalArtist;
  expenses: NominaExpense[];
}

export interface ExpenseRowProps extends ReadOnlyAware {
  artist: NominaModalArtist;
  expense: NominaExpense;
}

export interface ExpenseTargetChipProps {
  target: NominaExpenseTarget;
}

export interface MonthOverviewPanelProps {
  artistName: string;
  currentMonth: string;
  parts: NominaBucketAmount[];
  points: NominaDailyPoint[];
}

export interface ProfileDistributionProps {
  monthLabel: string;
  parts: NominaBucketAmount[];
}

export interface HistoryTabProps {
  profile: NominaArtistProfile;
}

export interface MonthsMapChartProps {
  months: NominaBudgetMonth[];
  currentMonth: string;
}

export interface BudgetTableProps {
  months: NominaBudgetMonth[];
  currentMonth: string;
}

export interface BudgetRowProps {
  month: NominaBudgetMonth;
  isCurrent: boolean;
}

export interface AdsTabProps {
  raised: number;
  /** Gasto en Ads total: gastos con destino Ads más campañas. */
  spent: number;
  campaignSpent: number;
  campaigns: NominaArtistCampaign[];
  /** En el portal del artista no se enlaza al panel interno. */
  isReadOnly?: boolean;
}

export interface CampaignSpendPanelProps {
  campaigns: NominaArtistCampaign[];
  isReadOnly: boolean;
}

export interface CampaignSpendRowProps {
  campaign: NominaArtistCampaign;
  isReadOnly: boolean;
}

export interface UnconvertedSpendNoteProps {
  campaigns: NominaArtistCampaign[];
}

/** Columna de una tabla que hoy siempre está vacía. */
export interface EmptyTableColumn {
  label: string;
  align?: "left" | "right" | "center";
}

export interface EmptyTablePanelProps {
  title: string;
  subtitle?: string;
  columns: EmptyTableColumn[];
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
}

export interface LegalNoteCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProfileNotFoundProps {
  backHref: string;
}

export interface PortalStateCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Bolsas de un mes del histórico, con los impuestos ya derivados. */
export interface BudgetMonthSplit {
  service: number;
  netProfit: number;
  taxes: number;
  investment: number;
  expressInvestment: number;
}

export interface FinanceTabProps extends ReadOnlyAware {
  profile: NominaArtistProfile;
}
