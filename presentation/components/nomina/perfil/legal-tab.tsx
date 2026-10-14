import { FileCheck2, Music, ScrollText } from "lucide-react";
import { WORKS_COLUMNS } from "@/constants/nomina-perfil-columns.constants";
import { OPTIMIZATION_LEGAL_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { EmptyTablePanel } from "@/presentation/components/nomina/perfil/empty-table-panel";
import { LegalNoteCard } from "@/presentation/components/nomina/perfil/legal-note-card";

/** Pestaña Legal (maqueta): propiedad intelectual, composición y obras, sin datos. */
export function LegalTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LegalNoteCard icon={FileCheck2} title={OPTIMIZATION_LEGAL_COPY.ipTitle} description={OPTIMIZATION_LEGAL_COPY.ipDescription} />
        <LegalNoteCard icon={Music} title={OPTIMIZATION_LEGAL_COPY.compositionTitle} description={OPTIMIZATION_LEGAL_COPY.compositionDescription} />
      </div>
      <EmptyTablePanel
        title={OPTIMIZATION_LEGAL_COPY.worksTitle}
        columns={WORKS_COLUMNS}
        icon={ScrollText}
        emptyTitle={OPTIMIZATION_LEGAL_COPY.worksEmptyTitle}
        emptyDescription={OPTIMIZATION_LEGAL_COPY.worksEmptyDescription}
      />
    </>
  );
}
