import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type {
  ArtistProfitRow,
  ArtistTaxRow,
  BusinessHealth,
  FinanceKpi,
  FinanceTab,
  IncomeStatement,
  LedgerEntry,
  LedgerTotals,
  MonthlyTaxRow,
  PerHundredPart,
  StackedSeries,
} from "@/types/nomina-finanzas.types";
import type { MiniStatProps, ProfitLevel } from "@/types/nomina-ui.types";
import type { SankeyLayout, SankeyMode } from "@/types/nomina-sankey.types";
import type { FilterSelectOption } from "@/types/ui.types";

export interface FinanceTabProps {
  finance: NominaFinance;
}

export interface FinanceTabsNavProps {
  active: FinanceTab;
  /** Valor de `?periodo=` que conservan las pestañas. */
  period: string;
}

export interface FinanceTabContentProps extends FinanceTabProps {
  tab: FinanceTab;
}

export interface FinanzasPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface BusinessHealthCardProps {
  health: BusinessHealth;
}

export interface FinanceKpiGridProps {
  kpis: FinanceKpi[];
  /** «vs. mes anterior» o «vs. periodo anterior». */
  comparison?: string;
  className?: string;
}

export interface FinanceEmptyNoteProps {
  title: string;
  text?: string;
}

export interface MiniStatGridProps {
  stats: MiniStatProps[];
  className?: string;
}

export interface MonthlyEvolutionChartProps {
  months: NominaMonthSplit[];
}

export interface IncomeStatementTableProps {
  statement: IncomeStatement;
}

export interface CashFlowPanelProps {
  layouts: Record<SankeyMode, SankeyLayout>;
  periodLabel: string;
}

export interface PerHundredPanelProps {
  parts: PerHundredPart[];
  income: number;
}

export interface ArtistProfitTableProps {
  rows: ArtistProfitRow[];
}

export interface ArtistProfitRowProps {
  row: ArtistProfitRow;
}

export interface ProfitMarginBarProps {
  margin: number | null;
  level: ProfitLevel;
}

export interface StackedColumnsChartProps {
  categories: string[];
  series: StackedSeries[];
  /** Descripción de la gráfica para lectores de pantalla. */
  label: string;
}

export interface TaxesOverTimeChartProps {
  rows: MonthlyTaxRow[];
}

export interface MonthlyTaxTableProps {
  rows: MonthlyTaxRow[];
}

export interface ArtistTaxTableProps {
  rows: ArtistTaxRow[];
}

export interface LedgerPanelProps {
  entries: LedgerEntry[];
  artists: FilterSelectOption<string>[];
  periodLabel: string;
}

export interface LedgerTableProps {
  entries: LedgerEntry[];
  totals: LedgerTotals;
  hiddenCount: number;
  onShowAll: () => void;
}

export interface LedgerRowProps {
  entry: LedgerEntry;
}

export interface LedgerMoreRowProps {
  count: number;
  onShowAll: () => void;
}

export interface LedgerTotalRowProps {
  totals: LedgerTotals;
}
