"use client";

import { Ellipsis } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { ConnectionActionsMenuProps } from "@/types/connections.types";

/**
 * Acciones secundarias de una conexión. Solo la que toca ahora queda a la vista
 * como botón; el resto vive aquí, para que tres plataformas no sumen nueve
 * botones compitiendo en la misma columna.
 *
 * Es cliente solo por el `trigger`: una función no cruza el límite servidor →
 * cliente, así que quien se lo pasa a `DropdownMenu` tiene que estar del mismo
 * lado. Los formularios siguen llegando como children ya renderizados.
 */
export function ConnectionActionsMenu({
  platform,
  children,
}: ConnectionActionsMenuProps) {
  return (
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
    </DropdownMenu>
  );
}
