"use client";

import { usePathname } from "next/navigation";
import { resolveRouteTitle } from "@/utils/resolve-route-title";

/** Único `h1` del panel: la topbar rotula la sección en la que está el usuario. */
export function TopbarTitle() {
  const pathname = usePathname();

  return (
    <h1 className="text-[28px] leading-tight font-light tracking-[-0.5px] text-text-primary">
      {resolveRouteTitle(pathname)}
    </h1>
  );
}
