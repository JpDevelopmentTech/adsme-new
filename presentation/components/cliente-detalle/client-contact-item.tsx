import type { ClientContactItemProps } from "@/types/client-detail.types";

/** Dato de contacto con su icono, dentro de la cabecera del cliente. */
export function ClientContactItem({ icon, value }: ClientContactItemProps) {
  return (
    <li className="flex items-center gap-2 text-[13px] font-normal text-text-secondary">
      <span className="text-text-muted">{icon}</span>
      {value}
    </li>
  );
}
