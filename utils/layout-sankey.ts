import { SANKEY_GEOMETRY as G } from "@/constants/nomina-sankey.constants";
import type { SankeyGraph, SankeyLayout, SankeyNodeBox, SankeyNodeSpec } from "@/types/nomina-sankey.types";
import { buildSankeyLinks } from "@/utils/build-sankey-links";
import { stackSankeyColumn } from "@/utils/stack-sankey-column";

/**
 * Coloca el grafo en un `viewBox` de 1000 de ancho: las tres primeras columnas
 * centradas en la misma línea y la última junto a su nodo padre, empujando hacia
 * abajo si se solapa. El alto sale de lo que ocupen los nodos.
 */
export function layoutSankey(graph: SankeyGraph): SankeyLayout {
  const scale = graph.total > 0 ? G.flowHeight / graph.total : 0;
  const heightOf = (node: SankeyNodeSpec) => Math.max(node.value * scale, G.minNodeHeight);
  const boxes = new Map<string, SankeyNodeBox>();
  const place = (node: SankeyNodeSpec, y: number) => boxes.set(node.id, { ...node, x: G.columnsX[node.column], y, height: heightOf(node) });

  const columns = [0, 1, 2].map((column) => graph.nodes.filter((node) => node.column === column));
  const stacks = columns.map((nodes) => stackSankeyColumn(nodes.map(heightOf), G.gap, G.labelSpacing));
  const center = G.padTop + Math.max(0, ...stacks.map((stack) => stack.extent)) / 2;
  columns.forEach((nodes, column) => nodes.forEach((node, index) => place(node, center - stacks[column].extent / 2 + stacks[column].offsets[index])));

  let floor = G.padTop;
  columns[2].forEach((parent) => {
    const children = graph.nodes.filter((node) => node.parent === parent.id);
    const box = boxes.get(parent.id);
    if (children.length === 0 || !box) return;
    const stack = stackSankeyColumn(children.map(heightOf), G.childGap, G.labelSpacing);
    const start = Math.max(box.y + box.height / 2 - stack.extent / 2, floor);
    children.forEach((node, index) => place(node, start + stack.offsets[index]));
    floor = start + stack.extent + G.gap;
  });

  const nodes = [...boxes.values()];
  const bottom = Math.max(0, ...nodes.map((node) => node.y + node.height));

  return {
    width: G.width,
    height: Math.ceil(bottom + G.padBottom),
    total: graph.total,
    nodes,
    links: buildSankeyLinks(graph.links, boxes, scale),
  };
}
