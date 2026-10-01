"use client";

import { useState, type KeyboardEvent } from "react";
import type { ListboxNavigation } from "@/types/listbox-navigation.types";

/**
 * Navegación con teclado de un combobox con lista: ↑/↓ recorren las opciones en
 * bucle, Enter elige la activa (o la primera si no hay ninguna) y Esc cierra.
 * El foco nunca sale del input; la opción activa se expone por índice para
 * `aria-activedescendant`.
 */
export function useListboxNavigation<T>(
  options: T[],
  onSelect: (option: T) => void,
  onClose: () => void,
): ListboxNavigation {
  const [activeIndex, setActiveIndex] = useState(-1);
  const count = options.length;

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && count > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % count);
    } else if (event.key === "ArrowUp" && count > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? count - 1 : index - 1));
    } else if (event.key === "Enter" && count > 0) {
      event.preventDefault();
      onSelect(options[activeIndex >= 0 ? activeIndex : 0]);
    } else if (event.key === "Escape") {
      onClose();
    }
  }

  return { activeIndex: activeIndex < count ? activeIndex : -1, setActiveIndex, onKeyDown };
}
