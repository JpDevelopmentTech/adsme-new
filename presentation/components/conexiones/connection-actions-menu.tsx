"use client";

import { Ellipsis, Unlink } from "lucide-react";
import { useState } from "react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { DisconnectDialog } from "@/presentation/components/conexiones/disconnect-dialog";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import { MENU_ITEM_CLASSES } from "@/utils/menu-item-styles";
import type { ConnectionActionsMenuProps } from "@/types/connections.types";

/**
 * Acciones secundarias de una conexión. Solo la que toca ahora queda a la vista
 * como botón; el resto vive aquí, para que tres plataformas no sumen nueve
 * botones compitiendo en la misma columna.
 *
 * «Desconectar» es común a todas y siempre la última. Su confirmación va fuera
 * del menú: si viviera dentro, se desmontaría al cerrarse el menú.
 */
export function ConnectionActionsMenu({
  platform,
  disconnectAction,
  children,
}: ConnectionActionsMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        side="bottom"
        align="end"
        label={CONNECTIONS_COPY.actions(platform)}
        trigger={() => (
          <span className="grid size-[34px] place-items-center rounded-md text-g-500 transition-colors duration-150 hover:bg-white/70 hover:text-text-primary">
            <Ellipsis size={16} aria-hidden />
          </span>
        )}
      >
        {children}

        <button
          type="button"
          role="menuitem"
          onClick={() => setIsConfirmOpen(true)}
          className={MENU_ITEM_CLASSES}
        >
          <Unlink size={15} strokeWidth={1.5} aria-hidden />
          {CONNECTIONS_COPY.disconnect}
        </button>
      </DropdownMenu>

      <DisconnectDialog
        isOpen={isConfirmOpen}
        platform={platform}
        action={disconnectAction}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
