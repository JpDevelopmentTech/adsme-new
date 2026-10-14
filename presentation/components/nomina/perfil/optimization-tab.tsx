import { Sparkles } from "lucide-react";
import { PIECES_COLUMNS } from "@/constants/nomina-perfil-columns.constants";
import { OPTIMIZATION_LEGAL_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { EmptyTablePanel } from "@/presentation/components/nomina/perfil/empty-table-panel";

/** Pestaña Optimización (maqueta): las piezas de contenido, siempre vacías. */
export function OptimizationTab() {
  return (
    <EmptyTablePanel
      title={OPTIMIZATION_LEGAL_COPY.piecesTitle}
      subtitle={OPTIMIZATION_LEGAL_COPY.piecesSubtitle}
      columns={PIECES_COLUMNS}
      icon={Sparkles}
      emptyTitle={OPTIMIZATION_LEGAL_COPY.piecesEmptyTitle}
      emptyDescription={OPTIMIZATION_LEGAL_COPY.piecesEmptyDescription}
    />
  );
}
