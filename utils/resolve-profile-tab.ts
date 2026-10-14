import { DEFAULT_PROFILE_TAB, PROFILE_TABS } from "@/constants/nomina-perfil-copy.constants";
import type { ProfileTab } from "@/types/nomina-perfil.types";

/** Pestaña del perfil a partir de `?pestana=`; cualquier otro valor cae en Finanzas. */
export function resolveProfileTab(value: string | string[] | undefined): ProfileTab {
  const raw = Array.isArray(value) ? value[0] : value;
  return PROFILE_TABS.find((tab) => tab.value === raw)?.value ?? DEFAULT_PROFILE_TAB;
}
