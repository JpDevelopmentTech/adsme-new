import type { KeyboardEvent } from "react";

/** Estado y manejador de teclado de un combobox con lista de opciones. */
export interface ListboxNavigation {
  /** Índice de la opción activa, o -1 si ninguna lo está. */
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
