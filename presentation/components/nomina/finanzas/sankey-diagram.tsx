"use client";

import { SANKEY_GEOMETRY, SANKEY_LINK_OPACITY } from "@/constants/nomina-sankey.constants";
import { FINANCE_FLOW_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { SankeyLinkPath } from "@/presentation/components/nomina/finanzas/sankey-link-path";
import { SankeyNodeLabel } from "@/presentation/components/nomina/finanzas/sankey-node-label";
import type { SankeyDiagramProps } from "@/types/nomina-sankey.types";

/**
 * Sankey propio en SVG: escala al ancho del panel con el `viewBox` y, en
 * pantallas estrechas, se desplaza en horizontal antes que encoger las etiquetas.
 */
export function SankeyDiagram({ layout, activeId, onActivate }: SankeyDiagramProps) {
  const opacityOf = (id: string) => {
    if (activeId === null) return SANKEY_LINK_OPACITY.idle;
    return id === activeId ? SANKEY_LINK_OPACITY.active : SANKEY_LINK_OPACITY.dimmed;
  };

  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={FINANCE_FLOW_COPY.chartLabel}
        className="block h-auto w-full min-w-[680px]"
        onMouseLeave={() => onActivate(null)}
      >
        <g>
          {layout.links.map((link) => (
            <SankeyLinkPath key={link.id} link={link} opacity={opacityOf(link.id)} onActivate={onActivate} />
          ))}
        </g>
        <g>
          {layout.nodes.map((node) => (
            <rect key={node.id} x={node.x} y={node.y} width={SANKEY_GEOMETRY.nodeWidth} height={node.height} rx={3} fill={node.color} />
          ))}
        </g>
        <g className="pointer-events-none">
          {layout.nodes.map((node) => (
            <SankeyNodeLabel key={node.id} node={node} total={layout.total} />
          ))}
        </g>
      </svg>
    </div>
  );
}
