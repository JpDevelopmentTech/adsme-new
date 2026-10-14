import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";
import { MonthBandFigure } from "@/presentation/components/nomina/artistas/month-band-figure";
import type { ArtistsMonthBandProps } from "@/types/nomina-artistas.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatNominaMonthName } from "@/utils/format-nomina-month-name";
import { formatServiceAssumedNote } from "@/utils/format-service-assumed-note";

/**
 * Banda del mes en curso sobre el roster: las cuatro cifras del mes con el
 * color de su bolsa, para leer la tabla con el total del mes de referencia.
 */
export function ArtistsMonthBand({ kpis, month }: ArtistsMonthBandProps) {
  const monthName = formatNominaMonthName(month);
  const figures = [
    { label: COPY.profit(monthName), value: kpis.profit, note: COPY.monthNote, dotColor: BUCKET_META.utilidad.color },
    { label: COPY.ads(monthName), value: kpis.investment, note: COPY.monthNote, dotColor: BUCKET_META.inversion.color },
    {
      label: COPY.services(monthName),
      value: kpis.service,
      note: formatServiceAssumedNote(kpis.serviceAssumedBy, kpis.artistCount) ?? COPY.monthNote,
      dotColor: BUCKET_META.servicio.color,
    },
    { label: COPY.gross(monthName), value: kpis.grossIncome, note: COPY.monthNote, dotColor: "#FFFFFF" },
  ];

  return (
    <section className="glass-panel rounded-card px-7 py-6">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 lg:gap-x-0">
        {figures.map((figure) => (
          <MonthBandFigure key={figure.label} {...figure} value={formatExactCurrency(figure.value)} />
        ))}
      </ul>
    </section>
  );
}
