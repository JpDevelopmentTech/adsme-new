import { AdsTab } from "@/presentation/components/nomina/perfil/ads-tab";
import { FinanceTab } from "@/presentation/components/nomina/perfil/finance-tab";
import { HistoryTab } from "@/presentation/components/nomina/perfil/history-tab";
import { LegalTab } from "@/presentation/components/nomina/perfil/legal-tab";
import { OptimizationTab } from "@/presentation/components/nomina/perfil/optimization-tab";
import type { ProfileTabContentProps } from "@/types/nomina-perfil.types";

/** Contenido de la pestaña activa del perfil. */
export function ProfileTabContent({ profile, tab, isReadOnly = false }: ProfileTabContentProps) {
  switch (tab) {
    case "historico":
      return <HistoryTab profile={profile} />;
    case "ads":
      return <AdsTab raised={profile.raisedInvestment} spent={profile.kpis.adsSpent} />;
    case "optimizacion":
      return <OptimizationTab />;
    case "legal":
      return <LegalTab />;
    default:
      return <FinanceTab profile={profile} isReadOnly={isReadOnly} />;
  }
}
