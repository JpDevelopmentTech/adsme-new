/** Cómo se agrupan los orígenes del flujo de caja. */
export type SankeyMode = "concepto" | "artista";

/** Columna del Sankey: orígenes, ingresos, reparto y destino final. */
export type SankeyColumn = 0 | 1 | 2 | 3;

/** Nodo antes de colocarlo: su nombre, color e importe. */
export interface SankeyNodeSpec {
  id: string;
  label: string;
  column: SankeyColumn;
  color: string;
  value: number;
  /** Nodo de la columna anterior junto al que se coloca (solo en la última). */
  parent?: string;
}

export interface SankeyLinkSpec {
  source: string;
  target: string;
  value: number;
}

/** Flujo de caja como grafo, antes de darle geometría. */
export interface SankeyGraph {
  nodes: SankeyNodeSpec[];
  links: SankeyLinkSpec[];
  /** Ingresos del periodo: la base de los porcentajes. */
  total: number;
}

/** Nodo colocado en el `viewBox`. */
export interface SankeyNodeBox extends SankeyNodeSpec {
  x: number;
  y: number;
  height: number;
}

/** Cinta lista para pintar, con los nombres de sus extremos. */
export interface SankeyLinkShape extends SankeyLinkSpec {
  id: string;
  path: string;
  color: string;
  sourceLabel: string;
  targetLabel: string;
}

export interface SankeyLayout {
  width: number;
  height: number;
  total: number;
  nodes: SankeyNodeBox[];
  links: SankeyLinkShape[];
}

export interface SankeyDiagramProps {
  layout: SankeyLayout;
  activeId: string | null;
  onActivate: (id: string | null) => void;
}

export interface SankeyNodeLabelProps {
  node: SankeyNodeBox;
  total: number;
}

export interface SankeyLinkPathProps {
  link: SankeyLinkShape;
  opacity: number;
  onActivate: (id: string | null) => void;
}

export interface SankeyHoverLineProps {
  link: SankeyLinkShape | null;
  total: number;
}
