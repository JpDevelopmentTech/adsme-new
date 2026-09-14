import Link from "next/link";
import { DASHBOARD_ROUTE } from "@/constants/routes.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Logotipo del sidebar; también sirve de acceso al inicio del panel. */
export function SidebarBrand() {
  return (
    <Link
      href={DASHBOARD_ROUTE}
      className="flex px-2.5 pt-2 pb-5 transition-opacity hover:opacity-80"
    >
      <BrandWordmark className="h-6" />
    </Link>
  );
}
