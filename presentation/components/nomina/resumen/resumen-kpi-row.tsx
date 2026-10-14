import { Briefcase, Landmark, Megaphone, TrendingUp } from "lucide-react";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { NOMINA_RESUMEN_COPY as COPY } from "@/constants/nomina-resumen-copy.constants";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import { GrossIncomeCard } from "@/presentation/components/nomina/resumen/gross-income-card";
import type { ResumenKpiRowProps } from "@/types/nomina-resumen.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { formatNominaMonthName } from "@/utils/format-nomina-month-name";
import { formatServiceAssumedNote } from "@/utils/format-service-assumed-note";

/**
 * Cifras del mes en curso: los Ingresos Brutos en grande y, a su lado, en qué
 * bolsas se repartieron. Todas las tarjetas comparten alto en la fila.
 */
export function ResumenKpiRow({ kpis, month }: ResumenKpiRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-[minmax(0,2.15fr)_repeat(4,minmax(0,1fr))]">
      <GrossIncomeCard
        label={COPY.grossLabel(formatNominaMonthName(month))}
        amount={kpis.grossIncome}
        note={COPY.grossNote(formatMonthLong(month))}
      />
      <NominaKpiCard label={COPY.profit} value={formatExactCurrency(kpis.profit)} icon={TrendingUp} iconColor={BUCKET_META.utilidad.color} />
      <NominaKpiCard label={COPY.ads} value={formatExactCurrency(kpis.investment)} icon={Megaphone} iconColor={BUCKET_META.inversion.color} />
      <NominaKpiCard
        label={COPY.services}
        value={formatExactCurrency(kpis.service)}
        icon={Briefcase}
        iconColor={BUCKET_META.servicio.color}
        note={formatServiceAssumedNote(kpis.serviceAssumedBy, kpis.artistCount)}
      />
      <NominaKpiCard label={COPY.taxes} value={formatExactCurrency(kpis.taxes)} icon={Landmark} iconColor={BUCKET_META.impuestos.color} />
    </div>
  );
}
