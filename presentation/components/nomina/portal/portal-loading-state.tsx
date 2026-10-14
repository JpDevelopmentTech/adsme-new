import { PORTAL_COPY } from "@/constants/nomina-portal-copy.constants";
import { LoaderBars } from "@/presentation/components/ui/loader-bars";

/** Mientras se carga el perfil: las barras de la marca y el aviso. */
export function PortalLoadingState() {
  return (
    <section role="status" className="glass-panel mx-auto my-auto flex w-full max-w-[420px] flex-col items-center gap-4 rounded-card px-8 py-16 text-center">
      <span className="text-lilac">
        <LoaderBars />
      </span>
      <p className="text-base font-normal text-text-primary">{PORTAL_COPY.loading}</p>
    </section>
  );
}
