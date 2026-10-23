import { CLIENT_NOMINA_COPY } from "@/constants/client-nomina-copy.constants";

/** Insignia de la lista de clientes para los que están inscritos en Nómina. */
export function ClientNominaBadge() {
  return (
    <span title={CLIENT_NOMINA_COPY.badgeLabel} className="shrink-0 rounded-pill bg-lilac/14 px-2 py-0.5 text-[11px] font-normal text-lilac">
      {CLIENT_NOMINA_COPY.badge}
    </span>
  );
}
