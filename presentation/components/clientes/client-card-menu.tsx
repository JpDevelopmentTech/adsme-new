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

/** Menú `⋯` de la tarjeta de cliente: editar y eliminar. */
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
            className="grid place-items-center rounded-md border border-border bg-card text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
          >
            <Ellipsis size={size >= 34 ? 18 : 16} aria-hidden />
          </span>
        )}
      >
        <Link
          href={editClientRoute(client.id)}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
        >
          <Pencil size={15} aria-hidden />
          {CLIENT_MENU_COPY.edit}
        </Link>
        <button
          type="button"
          role="menuitem"
          onClick={() => setIsConfirmOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap text-danger transition-colors hover:bg-danger/10"
        >
          <Trash2 size={15} aria-hidden />
          {CLIENT_MENU_COPY.delete}
        </button>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        title={CLIENT_MENU_COPY.deleteTitle}
        description={CLIENT_MENU_COPY.deleteDescription(client.name)}
        cancelLabel={CLIENT_MENU_COPY.cancel}
      >
        <form action={deleteClientAction}>
          <input
            type="hidden"
            name={CLIENT_FORM_FIELDS.clientId}
            value={client.id}
          />
          <DangerButton type="submit">{CLIENT_MENU_COPY.delete}</DangerButton>
        </form>
      </ConfirmDialog>
    </>
  );
}
