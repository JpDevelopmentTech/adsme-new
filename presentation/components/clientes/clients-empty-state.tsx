import { Plus, Users } from "lucide-react";
import { CLIENTS_EMPTY_COPY } from "@/constants/clients.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";

/** Estado vacío del listado, según `Estado · Vacío (Clientes)` del diseño. */
export function ClientsEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-card border border-border bg-card px-8 py-20">
      <div className="relative grid size-[180px] place-items-center">
        <span
          aria-hidden
          className="absolute size-[180px] rounded-full border border-brand-violet/15 bg-brand-violet/[0.04]"
        />
        <span
          aria-hidden
          className="absolute size-[130px] rounded-full border border-brand-violet/20 bg-brand-violet/[0.06]"
        />
        <span className="grid size-[88px] place-items-center rounded-card bg-brand-gradient">
          <Users size={38} strokeWidth={1.75} className="text-white" aria-hidden />
        </span>
        <span aria-hidden className="absolute bottom-[36px] flex items-end gap-[3px]">
          {[28, 18, 34, 22].map((height, index) => (
            <span
              key={index}
              className="w-[5px] rounded-[2px] bg-data-cyan"
              style={{ height }}
            />
          ))}
        </span>
      </div>

      <div className="flex w-[440px] max-w-full flex-col items-center gap-2.5 text-center">
        <p className="font-display text-[22px] font-bold text-text-primary">
          {CLIENTS_EMPTY_COPY.title}
        </p>
        <p className="text-sm leading-[1.5] text-text-secondary">
          {CLIENTS_EMPTY_COPY.subtitle}
        </p>
      </div>

      <PrimaryLink href={NEW_CLIENT_ROUTE}>
        <Plus size={18} strokeWidth={2} aria-hidden />
        {CLIENTS_EMPTY_COPY.action}
      </PrimaryLink>
    </div>
  );
}
