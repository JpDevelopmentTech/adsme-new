"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/** `true` solo en el navegador, tras hidratar; sirve para montar portales sin romper el SSR. */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
