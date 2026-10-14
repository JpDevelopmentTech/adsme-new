"use client";

import { useState } from "react";
import { FINANCE_FLOW_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { SankeyDiagram } from "@/presentation/components/nomina/finanzas/sankey-diagram";
import { SankeyHoverLine } from "@/presentation/components/nomina/finanzas/sankey-hover-line";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import type { CashFlowPanelProps } from "@/types/nomina-finanzas-props.types";
import type { SankeyMode } from "@/types/nomina-sankey.types";

const MODES: { value: SankeyMode; label: string }[] = [
  { value: "concepto", label: COPY.byConcept },
  { value: "artista", label: COPY.byArtist },
];

/** Panel del flujo de caja: elige cómo agrupar los orígenes y cuenta el flujo bajo el cursor. */
export function CashFlowPanel({ layouts, periodLabel }: CashFlowPanelProps) {
  const [mode, setMode] = useState<SankeyMode>("concepto");
  const [activeId, setActiveId] = useState<string | null>(null);
  const layout = layouts[mode];
  const active = layout.links.find((link) => link.id === activeId) ?? null;

  const changeMode = (next: SankeyMode) => {
    setMode(next);
    setActiveId(null);
  };

  return (
    <NominaPanel
      title={COPY.title}
      subtitle={`${COPY.subtitleLead} · ${periodLabel}`}
      actions={<SegmentedControl label={COPY.modeLabel} value={mode} options={MODES} onChange={changeMode} />}
    >
      <SankeyDiagram layout={layout} activeId={activeId} onActivate={setActiveId} />
      <SankeyHoverLine link={active} total={layout.total} />
    </NominaPanel>
  );
}
