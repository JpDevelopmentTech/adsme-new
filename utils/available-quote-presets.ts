import type { QuotePlatform } from "@/domain/entities/quote";
import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";

/** Presets que aún se pueden agregar: los que no están en la cotización, y «Otra plataforma» siempre. */
export function availableQuotePresets(presets: QuotePlatformPreset[], platforms: QuotePlatform[]): QuotePlatformPreset[] {
  return presets.filter((preset) => preset.key === "otra" || !platforms.some((platform) => platform.key === preset.key));
}
