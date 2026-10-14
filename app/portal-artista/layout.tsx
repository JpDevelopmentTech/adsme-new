import type { ReactNode } from "react";
import { NominaFooter } from "@/presentation/components/nomina/nomina-footer";
import { PortalTopbar } from "@/presentation/components/nomina/portal/portal-topbar";

/**
 * Portal del artista: fuera del panel, sin menú lateral. Una sola ventana de
 * vidrio con su barra propia y el perfil centrado debajo.
 */
export default function ArtistPortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh lg:p-5">
      <div className="glass-window flex min-w-0 flex-1 flex-col overflow-hidden lg:rounded-window">
        <PortalTopbar />
        <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-7 px-4 pt-7 pb-8 sm:px-8">
          <main className="relative isolate flex flex-1 flex-col gap-7">{children}</main>
          <NominaFooter />
        </div>
      </div>
    </div>
  );
}
