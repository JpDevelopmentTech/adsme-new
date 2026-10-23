"use client";

import { useState, type KeyboardEvent } from "react";
import type { QuoteCombobox, QuoteComboboxHandlers } from "@/types/quote-campaign.types";

/**
 * Combobox del cotizador: ↑/↓ abren y recorren las opciones en bucle, Enter
 * elige la resaltada (o, si no hay, agrega lo escrito cuando se permite) y Esc
 * cierra. A diferencia del buscador global, Enter sin resaltado no elige la
 * primera: en el cotizador escribir y confirmar debe respetar lo escrito.
 */
export function useQuoteCombobox<T>(options: T[], { onPick, onEnterFree }: QuoteComboboxHandlers<T>): QuoteCombobox {
  const [isOpen, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const count = options.length;
  const current = isOpen && activeIndex < count ? activeIndex : -1;

  function setIsOpen(next: boolean) {
    setOpen(next);
    if (!next) setActiveIndex(-1);
  }

  function move(step: 1 | -1) {
    setIsOpen(true);
    if (!count) return;
    setActiveIndex(current < 0 ? (step === 1 ? 0 : count - 1) : (current + step + count) % count);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter") {
      if (current >= 0) {
        event.preventDefault();
        onPick(options[current]);
        setActiveIndex(-1);
      } else if (onEnterFree) {
        event.preventDefault();
        onEnterFree();
      }
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }
  }

  return { isOpen, setIsOpen, activeIndex: current, setActiveIndex, onKeyDown };
}
