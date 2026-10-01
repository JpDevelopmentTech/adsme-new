"use client";

import { Ellipsis, Eye, Pencil, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { JOB_FORM_FIELDS, JOB_MENU_COPY } from "@/constants/job-wizard.constants";
import { editJobRoute, jobDetailRoute } from "@/constants/routes.constants";
import { REPORT_LINK_COPY } from "@/constants/report-link.constants";
import { deleteJobAction } from "@/presentation/actions/delete-job-action";
import { regenerateReportLinkAction } from "@/presentation/actions/regenerate-report-link-action";
import { ConfirmDialog } from "@/presentation/components/ui/confirm-dialog";
import { DangerButton } from "@/presentation/components/ui/danger-button";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { JobRowMenuProps } from "@/types/jobs-list.types";

/** Menú `⋯` de cada fila del listado: editar y eliminar el trabajo. */
export function JobRowMenu({ job }: JobRowMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        side="bottom"
        align="end"
        label={`Acciones de ${job.title}`}
        trigger={() => (
          <span className="grid size-[34px] place-items-center rounded-pill text-text-secondary transition-colors duration-150 hover:bg-surface hover:text-text-primary">
            <Ellipsis size={18} aria-hidden />
          </span>
        )}
      >
        <Link
          href={jobDetailRoute(job.id)}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-text-primary transition-colors hover:bg-surface"
        >
          <Eye size={16} strokeWidth={1.5} aria-hidden />
          Ver detalle
        </Link>
        <Link
          href={editJobRoute(job.id)}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-text-primary transition-colors hover:bg-surface"
        >
          <Pencil size={16} strokeWidth={1.5} aria-hidden />
          {JOB_MENU_COPY.edit}
        </Link>
        <button
          type="button"
          role="menuitem"
          onClick={() => setIsRegenerateOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-text-primary transition-colors hover:bg-surface"
        >
          <RefreshCw size={16} strokeWidth={1.5} aria-hidden />
          {REPORT_LINK_COPY.regenerate}
        </button>
        <span aria-hidden className="my-0.5 block h-px bg-border" />
        <button
          type="button"
          role="menuitem"
          onClick={() => setIsConfirmOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-danger transition-colors hover:bg-danger/10"
        >
          <Trash2 size={16} strokeWidth={1.5} aria-hidden />
          {JOB_MENU_COPY.delete}
        </button>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isRegenerateOpen}
        onCancel={() => setIsRegenerateOpen(false)}
        tone="warning"
        icon={<RefreshCw size={22} strokeWidth={1.5} aria-hidden />}
        title={REPORT_LINK_COPY.regenerateTitle}
        description={REPORT_LINK_COPY.regenerateDescription(job.title)}
        cancelLabel={REPORT_LINK_COPY.cancel}
      >
        <form action={regenerateReportLinkAction}>
          <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
          <DangerButton type="submit" className="bg-warning">
            {REPORT_LINK_COPY.confirm}
          </DangerButton>
        </form>
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        icon={<Trash2 size={22} strokeWidth={1.5} aria-hidden />}
        title={JOB_MENU_COPY.deleteTitle}
        description={JOB_MENU_COPY.deleteDescription(job.title)}
        cancelLabel={JOB_MENU_COPY.cancel}
      >
        <form action={deleteJobAction}>
          <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
          <DangerButton type="submit">{JOB_MENU_COPY.confirmDelete}</DangerButton>
        </form>
      </ConfirmDialog>
    </>
  );
}
