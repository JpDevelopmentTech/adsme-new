import type { Metadata } from "next";
import { NOMINA_RESUMEN_COPY as COPY } from "@/constants/nomina-resumen-copy.constants";
import { createGetNominaOverview } from "@/domain/use-cases/get-nomina-overview";
import { createSampleNominaRepository } from "@/infrastructure/repositories/sample-nomina-repository";
import { DistributionCard } from "@/presentation/components/nomina/distribution-card";
import { NewArtistButton } from "@/presentation/components/nomina/modales/new-artist-button";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { NominaTopbar } from "@/presentation/components/nomina/nomina-topbar";
import { PerformanceChart } from "@/presentation/components/nomina/performance-chart";
import { ResumenKpiRow } from "@/presentation/components/nomina/resumen/resumen-kpi-row";
import { TopArtistsPanel } from "@/presentation/components/nomina/resumen/top-artists-panel";
import { formatMonthLong } from "@/utils/format-nomina-dates";

export const metadata: Metadata = { title: COPY.metaTitle };

/**
 * Pantalla Resumen de la Nómina Plan: el mes en curso de todo el roster, de la
 * cifra bruta a cómo se repartió, su evolución diaria y quién la generó.
 */
export default async function NominaResumenPage() {
  const overview = await createGetNominaOverview(createSampleNominaRepository())();
  const monthLabel = formatMonthLong(overview.month);

  return (
    <>
      <NominaTopbar title={COPY.title} subtitle={COPY.subtitle(monthLabel)} hasSearch action={<NewArtistButton />} />

      <ResumenKpiRow kpis={overview.kpis} month={overview.month} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <NominaPanel>
          <PerformanceChart
            title={COPY.performanceTitle}
            subtitle={COPY.performanceSubtitle}
            points={overview.performance}
            currentMonth={overview.month}
          />
        </NominaPanel>
        <DistributionCard title={COPY.distributionTitle} subtitle={monthLabel} parts={overview.distribution} />
      </div>

      <TopArtistsPanel artists={overview.topArtists} hasArtists={overview.kpis.artistCount > 0} />
    </>
  );
}
