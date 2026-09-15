"use client";

import { usePathname } from "next/navigation";
import { resolveRouteTitle } from "@/utils/resolve-route-title";

/** Único `h1` del panel: la topbar rotula la sección en la que está el usuario. */
export function TopbarTitle() {
  const pathname = usePathname();

  return (
    <h1 className="font-display text-[19px] font-normal tracking-[-0.4px] text-text-primary">
      {resolveRouteTitle(pathname)}
    </h1>
  );
}
