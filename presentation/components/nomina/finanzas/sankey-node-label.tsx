import { SANKEY_GEOMETRY, SANKEY_LABEL_HALO } from "@/constants/nomina-sankey.constants";
import type { SankeyNodeLabelProps } from "@/types/nomina-sankey.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPercent } from "@/utils/format-percent";

const HALO = { stroke: SANKEY_LABEL_HALO, strokeWidth: 4, strokeLinejoin: "round", paintOrder: "stroke" } as const;

/** Posición y anclaje de la etiqueta: orígenes y reparto a la izquierda, Ingresos encima, destinos a la derecha. */
function placement(column: number, x: number, y: number, height: number) {
  const middle = y + height / 2;
  if (column === 1) return { x: x + SANKEY_GEOMETRY.nodeWidth / 2, y: y - 24, anchor: "middle" as const };
  if (column === 3) return { x: x + SANKEY_GEOMETRY.nodeWidth + 10, y: middle - 7, anchor: "start" as const };
  return { x: x - 10, y: middle - 7, anchor: "end" as const };
}

/** Nombre del nodo y, debajo, su importe con la parte de los ingresos que representa. */
export function SankeyNodeLabel({ node, total }: SankeyNodeLabelProps) {
  const { x, y, anchor } = placement(node.column, node.x, node.y, node.height);
  const share = total > 0 ? formatPercent((node.value / total) * 100) : "—";

  return (
    <text x={x} y={y} textAnchor={anchor} {...HALO}>
      <tspan x={x} dy="0.35em" fontSize={12.5} fill="#FFFFFF" fontWeight={400}>
        {node.label}
      </tspan>
      <tspan x={x} dy={16} fontSize={11} fill="#FFFFFF8F" fontWeight={300}>
        {`${formatExactCurrency(node.value)} · ${share}`}
      </tspan>
    </text>
  );
}
