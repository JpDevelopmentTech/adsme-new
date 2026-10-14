import { SANKEY_GEOMETRY } from "@/constants/nomina-sankey.constants";
import type { SankeyLinkShape, SankeyLinkSpec, SankeyNodeBox } from "@/types/nomina-sankey.types";
import { sankeyRibbonPath } from "@/utils/sankey-ribbon-path";

/**
 * Da forma a las cintas: cada una ocupa su tramo en el borde del origen y del
 * destino, en el orden recibido. Toma el color del destino cuando va al reparto
 * y el del origen cuando llega a Ingresos.
 */
export function buildSankeyLinks(links: SankeyLinkSpec[], boxes: Map<string, SankeyNodeBox>, scale: number): SankeyLinkShape[] {
  const outgoing = new Map<string, number>();
  const incoming = new Map<string, number>();

  return links.flatMap((link) => {
    const source = boxes.get(link.source);
    const target = boxes.get(link.target);
    if (!source || !target) return [];

    const thickness = link.value * scale;
    const sourceY = source.y + (outgoing.get(source.id) ?? 0);
    const targetY = target.y + (incoming.get(target.id) ?? 0);
    outgoing.set(source.id, (outgoing.get(source.id) ?? 0) + thickness);
    incoming.set(target.id, (incoming.get(target.id) ?? 0) + thickness);

    return [{
      ...link,
      id: `${link.source}->${link.target}`,
      path: sankeyRibbonPath(source.x + SANKEY_GEOMETRY.nodeWidth, sourceY, target.x, targetY, thickness),
      color: target.column >= 2 ? target.color : source.color,
      sourceLabel: source.label,
      targetLabel: target.label,
    }];
  });
}
