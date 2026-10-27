"use client";

import { useState } from "react";
import type { InlineClientCreation } from "@/types/job-wizard.types";
import type { FilterSelectOption } from "@/types/ui.types";

/**
 * Alta de cliente sin salir del formulario: guarda lo escrito en el buscador
 * mientras el diálogo está abierto y, al crearse, pone el cliente el primero
 * —la lista va por recientes— y lo deja elegido.
 */
export function useInlineClientCreation(
  initialOptions: FilterSelectOption<string>[],
  onSelect: (clientId: string) => void,
): InlineClientCreation {
  const [options, setOptions] = useState(initialOptions);
  const [draftName, setDraftName] = useState<string | null>(null);

  const add = (client: FilterSelectOption<string>) => {
    setOptions((previous) => [client, ...previous]);
    onSelect(client.value);
    setDraftName(null);
  };

  return { options, draftName, open: setDraftName, close: () => setDraftName(null), add };
}
