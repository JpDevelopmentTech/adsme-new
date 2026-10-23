import type { ReactNode } from "react";
import { NominaFooter } from "@/presentation/components/nomina/nomina-footer";

/** Sección Cotizador: pinta su propia cabecera y lleva el pie de JP Development. */
export default function CotizadorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NominaFooter className="mt-auto" />
    </>
  );
}
