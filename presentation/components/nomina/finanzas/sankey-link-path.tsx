"use client";

import type { SankeyLinkPathProps } from "@/types/nomina-sankey.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/**
 * Cinta del Sankey. Se resalta al pasar el ratón o al llegar con el teclado,
 * y lleva su `title` para el tooltip nativo.
 */
export function SankeyLinkPath({ link, opacity, onActivate }: SankeyLinkPathProps) {
  return (
    <path
      d={link.path}
      fill={link.color}
      fillOpacity={opacity}
      tabIndex={0}
      aria-label={`${link.sourceLabel} → ${link.targetLabel}: ${formatExactCurrency(link.value)}`}
      className="cursor-pointer transition-[fill-opacity] duration-150 outline-none focus-visible:stroke-lilac focus-visible:stroke-2"
      onMouseEnter={() => onActivate(link.id)}
      onFocus={() => onActivate(link.id)}
      onBlur={() => onActivate(null)}
    >
      <title>{`${link.sourceLabel} → ${link.targetLabel}: ${formatExactCurrency(link.value)}`}</title>
    </path>
  );
}
