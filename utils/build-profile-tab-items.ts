import { DEFAULT_PROFILE_TAB, PROFILE_TABS } from "@/constants/nomina-perfil-copy.constants";
import type { ProfileTab } from "@/types/nomina-perfil.types";
import type { TabLinkItem } from "@/types/nomina-ui.types";

/** Enlaces de las pestañas del perfil; Finanzas vive en la ruta limpia. */
export function buildProfileTabItems(basePath: string, active: ProfileTab): TabLinkItem[] {
  return PROFILE_TABS.map((tab) => ({
    label: tab.label,
    href: tab.value === DEFAULT_PROFILE_TAB ? basePath : `${basePath}?pestana=${tab.value}`,
    isActive: tab.value === active,
  }));
}
