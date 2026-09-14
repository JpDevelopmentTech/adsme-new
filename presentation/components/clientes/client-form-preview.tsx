import { Eye } from "lucide-react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ClientFormPreviewProps } from "@/types/client-form.types";
import { getInitials } from "@/utils/get-initials";

/** Réplica de la tarjeta del listado que se actualiza mientras se llena el formulario. */
export function ClientFormPreview({
  values,
  meta,
  avatarUrl,
}: ClientFormPreviewProps) {
  const name = values.name.trim() || CLIENT_FORM_COPY.namePlaceholder;
  const handle = values.handle.trim() || CLIENT_FORM_COPY.handlePlaceholder;

  return (
    <aside className="flex w-full flex-col gap-4 rounded-card border border-border bg-card p-5 xl:w-[360px] xl:shrink-0">
      <div className="flex items-center gap-2">
        <Eye size={16} className="text-text-muted" aria-hidden />
        <span className="text-[13px] font-semibold text-text-secondary">
          {CLIENT_FORM_COPY.previewTitle}
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-md border border-border bg-card-elevated p-[18px]">
        <div className="flex items-center gap-[13px]">
          <Avatar
            initials={getInitials(name, handle.replace(/^@/, ""))}
            size={52}
            fontSize={16}
            gradient={meta.gradient}
            imageUrl={avatarUrl}
          />
          <div className="flex min-w-0 flex-col gap-[3px]">
            <span className="truncate text-[15px] font-semibold text-text-primary">
              {name}
            </span>
            <span className="truncate text-xs text-text-muted">
              {handle} · {values.kind}
            </span>
          </div>
        </div>

        <div className="flex rounded-md bg-card px-3.5 py-3">
          <div className="flex flex-1 flex-col gap-[3px]">
            <span className="font-display text-xl font-bold text-text-primary">
              {meta.jobsCount}
            </span>
            <span className="text-xs text-text-secondary">Trabajos</span>
          </div>
          <div className="flex flex-1 flex-col gap-[3px]">
            <span className="font-display text-xl font-bold text-text-primary">
              {meta.activeJobsCount}
            </span>
            <span className="text-xs text-text-secondary">Activos</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="rounded-pill bg-card px-[11px] py-[5px] text-xs text-text-secondary">
            {values.genre}
          </span>
          <StatusBadge label={meta.status.label} tone={meta.status.tone} />
        </div>
      </div>

      <p className="text-xs leading-[1.4] text-text-muted">
        {CLIENT_FORM_COPY.previewNote}
      </p>
    </aside>
  );
}
