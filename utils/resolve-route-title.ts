import { BRAND_NAME } from "@/constants/brand.constants";
import { NAV_SECTIONS } from "@/constants/navigation.constants";

const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

/**
 * Título de sección que muestra la topbar. Se resuelve por prefijo para que el
 * detalle de un cliente o el asistente de un trabajo sigan rotulando su sección.
 */
export function resolveRouteTitle(pathname: string): string {
  const match = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return match?.label ?? BRAND_NAME;
}
