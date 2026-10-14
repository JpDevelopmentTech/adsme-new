"use client";

import { usePathname } from "next/navigation";
import type { RouteGateProps } from "@/types/nomina-shell.types";

/**
 * Oculta su contenido en las rutas indicadas. Permite que una sección con
 * cabecera propia prescinda de la del panel sin duplicar el layout.
 */
export function RouteGate({ hiddenOn, children }: RouteGateProps) {
  const pathname = usePathname();
  const isHidden = hiddenOn.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return isHidden ? null : children;
}
