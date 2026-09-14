"use client";

import { PLATFORM_TABS } from "@/constants/link-campaign.constants";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { PlatformTabsProps } from "@/types/link-campaign.types";
import { cn } from "@/utils/cn";

/** Pestañas de plataforma; las cuentas sin conectar quedan deshabilitadas. */
export function PlatformTabs({ active, connected, onChange }: PlatformTabsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {PLATFORM_TABS.map((tab) => {
        const { Icon, color } = PLATFORM_META[PLATFORM_OF_CONNECTION[tab.platform]];
        const isConnected = connected.includes(tab.platform);
        const isActive = tab.platform === active;

        return (
          <button
            key={tab.platform}
            type="button"
            disabled={!isConnected}
            onClick={() => onChange(tab.platform)}
            title={isConnected ? undefined : "Cuenta sin conectar"}
            className={cn(
              "flex items-center gap-2 rounded-pill border px-4.5 py-2.5 text-[13px] font-semibold transition-colors",
              isActive
                ? "border-border-strong bg-card-elevated text-text-primary"
                : "border-border bg-card text-text-secondary hover:border-border-strong",
              !isConnected && "cursor-not-allowed opacity-45",
            )}
          >
            <span style={{ color: isActive || isConnected ? color : undefined }}>
              <Icon />
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
