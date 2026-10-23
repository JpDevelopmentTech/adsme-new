import type { QuotePlatformKey } from "@/domain/entities/quote";
import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";

/** Preset de una plataforma por su clave; si falta, el de «Otra plataforma» o el primero. */
export function findQuotePreset(presets: QuotePlatformPreset[], key: QuotePlatformKey): QuotePlatformPreset | undefined {
  return presets.find((preset) => preset.key === key) ?? presets.find((preset) => preset.key === "otra") ?? presets[0];
}
