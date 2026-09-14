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
          <span className="grid size-9 place-items-center rounded-md border border-border bg-card text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
            <Ellipsis size={18} aria-hidden />
          </span>
        )}
      >
        <Link
          href={jobDetailRoute(job.id)}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
        >
          <Eye size={15} aria-hidden />
          Ver detalle
        </Link>
        <Link
          href={editJobRoute(job.id)}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
        >
          <Pencil size={15} aria-hidden />
          {JOB_MENU_COPY.edit}
        </Link>
        <button
          type="button"
          role="menuitem"
          onClick={() => setIsRegenerateOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
        >
          <RefreshCw size={15} aria-hidden />
          {REPORT_LINK_COPY.regenerate}
        </button>
        <button
          type="button"
          role="menuitem"
          onClick={() => setIsConfirmOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-danger transition-colors hover:bg-danger/10"
        >
          <Trash2 size={15} aria-hidden />
          {JOB_MENU_COPY.delete}
        </button>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isRegenerateOpen}
        onCancel={() => setIsRegenerateOpen(false)}
        title={REPORT_LINK_COPY.regenerateTitle}
        description={REPORT_LINK_COPY.regenerateDescription(job.title)}
        cancelLabel={REPORT_LINK_COPY.cancel}
      >
        <form action={regenerateReportLinkAction}>
          <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
          <DangerButton type="submit">{REPORT_LINK_COPY.confirm}</DangerButton>
        </form>
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        title={JOB_MENU_COPY.deleteTitle}
        description={JOB_MENU_COPY.deleteDescription(job.title)}
        cancelLabel={JOB_MENU_COPY.cancel}
      >
        <form action={deleteJobAction}>
          <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
          <DangerButton type="submit">{JOB_MENU_COPY.delete}</DangerButton>
        </form>
      </ConfirmDialog>
    </>
  );
}
