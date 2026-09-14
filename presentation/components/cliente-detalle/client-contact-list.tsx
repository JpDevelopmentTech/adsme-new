import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { ClientContactItem } from "@/presentation/components/cliente-detalle/client-contact-item";
import type { ClientContactListProps } from "@/types/client-detail.types";

const ICON_SIZE = 15;

/** Fila de datos de contacto: correo, teléfono, ubicación y usuario público. */
export function ClientContactList({ client }: ClientContactListProps) {
  const items = [
    { key: "email", icon: <Mail size={ICON_SIZE} aria-hidden />, value: client.email },
    { key: "phone", icon: <Phone size={ICON_SIZE} aria-hidden />, value: client.phone },
    {
      key: "location",
      icon: <MapPin size={ICON_SIZE} aria-hidden />,
      value: `${client.city}, ${client.country}`,
    },
    {
      key: "handle",
      icon: <AtSign size={ICON_SIZE} aria-hidden />,
      value: client.handle,
    },
  ];

  return (
    <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2">
      {items.map((item) => (
        <ClientContactItem key={item.key} icon={item.icon} value={item.value} />
      ))}
    </ul>
  );
}
