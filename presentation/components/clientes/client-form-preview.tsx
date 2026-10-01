import { UserRound } from "lucide-react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import { TagPill } from "@/presentation/components/ui/tag-pill";
import type { ClientFormPreviewProps } from "@/types/client-form.types";
import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/get-initials";

/** Réplica de cómo se verá el cliente, que se actualiza mientras se llena el formulario. */
export function ClientFormPreview({ values, meta, avatarUrl }: ClientFormPreviewProps) {
  const hasName = values.name.trim().length > 0;
  const name = hasName ? values.name.trim() : CLIENT_FORM_COPY.nameLabel;
  const handle = values.handle.trim() || CLIENT_FORM_COPY.handlePlaceholder;

  return (
    <aside className="flex w-full flex-col gap-3.5 lg:w-[260px] lg:shrink-0">
      <p className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
        {CLIENT_FORM_COPY.previewTitle}
      </p>

      <div className="flex flex-col gap-[18px] rounded-[22px] border border-border bg-[linear-gradient(180deg,#8a4fff33,#ffffff0a)] p-[22px]">
        {hasName || avatarUrl ? (
          <Avatar
            initials={getInitials(name, handle.replace(/^@/, ""))}
            size={72}
            fontSize={22}
            gradient={meta.gradient}
            imageUrl={avatarUrl}
          />
        ) : (
          <span className="grid size-[72px] place-items-center rounded-pill border-[1.5px] border-white/30 bg-surface">
            <UserRound size={28} strokeWidth={1.5} className="text-text-muted" aria-hidden />
          </span>
        )}

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={cn("truncate text-lg font-light", hasName ? "text-text-primary" : "text-text-muted")}>
            {name}
          </span>
          <span className="truncate text-xs font-normal text-text-muted">
            {handle} · {values.kind}
          </span>
        </div>

        <div className="flex border-y border-border py-3.5">
          {[
            [meta.jobsCount, "Trabajos"],
            [meta.activeJobsCount, "Activos"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-1 flex-col gap-0.5">
              <span className="text-2xl leading-none font-extralight text-text-primary">{value}</span>
              <span className="text-xs font-normal text-text-muted">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <TagPill label={values.genre} />
          <StatusBadge label={meta.status.label} tone={meta.status.tone} />
        </div>
      </div>

      <p className="text-xs leading-[1.45] font-normal text-text-muted">
        {CLIENT_FORM_COPY.previewNote}
      </p>
    </aside>
  );
}
