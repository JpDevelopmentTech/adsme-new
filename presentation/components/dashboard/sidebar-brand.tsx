import Link from "next/link";
import { DASHBOARD_ROUTE } from "@/constants/routes.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Logotipo del sidebar; también sirve de acceso al inicio del panel. */
export function SidebarBrand() {
  return (
    <Link
      href={DASHBOARD_ROUTE}
      className="flex px-[11px] py-1 transition-opacity duration-100 hover:opacity-70"
    >
      <BrandWordmark className="h-[22px]" />
    </Link>
  );
}
