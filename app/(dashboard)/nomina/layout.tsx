import type { ReactNode } from "react";
import { NominaFooter } from "@/presentation/components/nomina/nomina-footer";

/** Sección Nómina Plan: sus pantallas pintan su cabecera y comparten el pie. */
export default function NominaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NominaFooter className="mt-auto" />
    </>
  );
}
