"use client";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CLIENT_MENU_COPY } from "@/constants/clients.constants";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import { editClientRoute } from "@/constants/routes.constants";
import { deleteClientAction } from "@/presentation/actions/delete-client-action";
import { ConfirmDialog } from "@/presentation/components/ui/confirm-dialog";
import { DangerButton } from "@/presentation/components/ui/danger-button";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { ClientCardMenuProps } from "@/types/client-form.types";

/** Menú `⋯` de la fila del cliente: editar (abre el modal) y eliminar con confirmación. */
export function ClientCardMenu({ client, size = 34 }: ClientCardMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        side="bottom"
        align="end"
        label={`Acciones de ${client.name}`}
        trigger={() => (
          <span
            style={{ width: size, height: size }}
            className="grid place-items-center rounded-pill text-text-secondary transition-colors duration-150 hover:bg-surface hover:text-text-primary"
          >
            <Ellipsis size={18} aria-hidden />
          </span>
        )}
      >
        <div className="flex w-[208px] flex-col gap-0.5">
          <Link
            href={editClientRoute(client.id)}
            scroll={false}
            role="menuitem"
            className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-text-primary transition-colors hover:bg-surface"
          >
            <Pencil size={16} strokeWidth={1.5} aria-hidden />
            {CLIENT_MENU_COPY.edit}
          </Link>
          <span aria-hidden className="my-0.5 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={() => setIsConfirmOpen(true)}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal whitespace-nowrap text-danger transition-colors hover:bg-danger/10"
          >
            <Trash2 size={16} strokeWidth={1.5} aria-hidden />
            {CLIENT_MENU_COPY.delete}
          </button>
        </div>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        icon={<Trash2 size={22} strokeWidth={1.5} aria-hidden />}
        title={CLIENT_MENU_COPY.deleteTitle}
        description={CLIENT_MENU_COPY.deleteDescription(client.name)}
        cancelLabel={CLIENT_MENU_COPY.cancel}
      >
        <form action={deleteClientAction}>
          <input type="hidden" name={CLIENT_FORM_FIELDS.clientId} value={client.id} />
          <DangerButton type="submit">{CLIENT_MENU_COPY.confirmDelete}</DangerButton>
        </form>
      </ConfirmDialog>
    </>
  );
}
