import { SETTINGS_MODAL_COPY, SETTINGS_TABS } from "@/constants/nomina-modales-perfil-copy.constants";
import type { SettingsTabsProps } from "@/types/nomina-modales-perfil.types";
import { cn } from "@/utils/cn";

/** Pestañas «Modelo de reparto» · «Redes y enlaces», con el subrayado lila. */
export function SettingsTabs({ value, onChange }: SettingsTabsProps) {
  return (
    <div role="tablist" aria-label={SETTINGS_MODAL_COPY.tabsLabel} className="flex gap-7 px-6 sm:px-8">
      {SETTINGS_TABS.map((tab) => (
        <button
          key={tab.value}
          id={`settings-tab-${tab.value}`}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          aria-controls={`settings-panel-${tab.value}`}
          onClick={() => onChange(tab.value)}
          className={cn(
            "-mb-px cursor-pointer border-b-2 px-0.5 pb-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
            tab.value === value ? "border-lilac font-normal text-text-primary" : "border-transparent font-light text-text-muted hover:text-text-secondary",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
