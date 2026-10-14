import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import type { EmptyTablePanelProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

const ALIGN_CLASSES = { left: "text-left", right: "text-right", center: "text-center" } as const;

/**
 * Tabla de maqueta que hoy siempre está vacía: sus columnas y el estado vacío
 * debajo, sin botón para añadir. La usan Ads, Optimización y Legal.
 */
export function EmptyTablePanel({ title, subtitle, columns, icon: Icon, emptyTitle, emptyDescription }: EmptyTablePanelProps) {
  return (
    <NominaPanel isThick title={title} subtitle={subtitle}>
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th key={column.label} scope="col" className={cn(NOMINA_TH_CLASSES, ALIGN_CLASSES[column.align ?? "left"])}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <EmptyStatePanel icon={<Icon size={22} strokeWidth={1.5} aria-hidden />} title={emptyTitle} description={emptyDescription} />
    </NominaPanel>
  );
}
