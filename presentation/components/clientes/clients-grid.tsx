import { ClientCard } from "@/presentation/components/clientes/client-card";
import type { ClientsGridProps } from "@/types/client.types";

export function ClientsGrid({ clients, monthName, nowIso }: ClientsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          monthName={monthName}
          nowIso={nowIso}
        />
      ))}
    </div>
  );
}
