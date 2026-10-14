/** Geometría del Sankey de Finanzas, en unidades del `viewBox`. */
export const SANKEY_GEOMETRY = {
  width: 1000,
  /** Alto que ocupan los ingresos en una columna, sin contar los huecos. */
  flowHeight: 340,
  nodeWidth: 14,
  padTop: 52,
  padBottom: 16,
  gap: 22,
  childGap: 12,
  /** Distancia mínima entre centros de nodos vecinos, para que no se pisen las etiquetas. */
  labelSpacing: 34,
  minNodeHeight: 3,
  columnsX: [130, 350, 580, 790],
} as const;

/** Colores de los nodos del flujo de caja. */
export const SANKEY_COLORS = {
  origin: "#9A93B5",
  others: "#D6D1E6",
  income: "#FFFFFF",
  service: "#A79FC2",
  profit: "#5EE6A8",
  investment: "#C9B6FF",
  taxes: "#FF6B81",
  netProfit: "#A6F4CF",
  consumed: "#8F6BFF",
  pending: "#E4DCFF",
} as const;

/** Opacidad de las cintas: en reposo, bajo el cursor y el resto mientras tanto. */
export const SANKEY_LINK_OPACITY = { idle: 0.2, active: 0.75, dimmed: 0.07 } as const;

/** Halo de las etiquetas, del color de la tarjeta, para leerse sobre las cintas. */
export const SANKEY_LABEL_HALO = "#140b28";
