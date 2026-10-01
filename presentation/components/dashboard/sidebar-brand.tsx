import Link from "next/link";
import { DASHBOARD_ROUTE } from "@/constants/routes.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Logotipo del sidebar; también sirve de acceso al inicio del panel. */
export function SidebarBrand() {
  return (
    <Link
      href={DASHBOARD_ROUTE}
      className="flex self-start rounded-sm transition-opacity duration-100 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <BrandWordmark className="h-7" />
    </Link>
  );
}
