import type { QuoteDraft } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { createQuotePlatform } from "@/domain/use-cases/quote/create-quote-draft";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { grandValue, moneyContext, rebalanceOthers, setPlatformTotal, type QuoteShareSnapshot } from "@/domain/use-cases/quote/quote-grand-total";
import { toCop } from "@/domain/use-cases/quote/quote-money";
import { applyPlatformField } from "@/domain/use-cases/quote/quote-platform-fields";
import { afterPlatformEdit } from "@/presentation/store/quote-after-edit";
import type { QuoteAction } from "@/types/quote-store.types";

/** Plataformas: agregar, quitar, campos, candado del total y su parte del total general. */
export function reducePlatform(draft: QuoteDraft, action: QuoteAction, snapshot: QuoteShareSnapshot, notify: (message: string) => void): boolean {
  const ctx = moneyContext(draft);
  const platform = "platformId" in action ? draft.platforms.find((item) => item.id === action.platformId) : undefined;

  switch (action.type) {
    case "addPlatform": {
      const created = createQuotePlatform(action.preset, draft.settings.fee);
      if (draft.grandFixed) {
        const used = draft.platforms.reduce((sum, item) => sum + calculateQuotePlatform(item, ctx).total, 0);
        created.anchor = "total";
        created.total = toCop(Math.max(0, grandValue(draft) - used), ctx);
      }
      draft.platforms.push(created);
      return true;
    }
    case "removePlatform":
      if (!platform) return true;
      draft.platforms = draft.platforms.filter((item) => item !== platform);
      rebalanceOthers(draft, null, snapshot);
      notify(`${platform.name} quitada`);
      return true;
    case "renamePlatform": if (platform) platform.name = action.name; return true;
    case "setPlatformNotes": if (platform) platform.notes = action.notes; return true;
    case "togglePlatformCollapsed": if (platform) platform.collapsed = !platform.collapsed; return true;
    case "collapseAllPlatforms": draft.platforms.forEach((item) => { item.collapsed = action.collapsed; }); return true;
    case "togglePlatformLock": {
      if (!platform) return true;
      if (!platform.locked && draft.platforms.length > 1 && !draft.platforms.some((item) => item !== platform && !item.locked)) {
        notify("Deja al menos una plataforma sin candado");
        return true;
      }
      const total = calculateQuotePlatform(platform, ctx).total;
      platform.locked = !platform.locked;
      if (platform.locked) {
        platform.anchor = "total";
        platform.total = toCop(total, ctx);
      }
      notify(platform.locked ? `Total de ${platform.name} bloqueado en ${formatQuoteMoney(total, draft.currency)}` : "Candado quitado");
      return true;
    }
    case "setPlatformShare": {
      if (!platform) return true;
      if (!draft.grandFixed) { draft.grandFixed = true; draft.grand = toCop(grandValue(draft), ctx); }
      setPlatformTotal(draft, platform, (grandValue(draft) * Math.min(100, Math.max(0, action.pct))) / 100, snapshot);
      return true;
    }
    case "setPlatformField":
      if (!platform) return true;
      if (action.field === "total" && draft.grandFixed && draft.platforms.length > 1) {
        setPlatformTotal(draft, platform, action.value, snapshot);
        return true;
      }
      applyPlatformField(platform, action.field, action.value, ctx);
      afterPlatformEdit(draft, platform, snapshot);
      return true;
    case "setServiceOn": if (platform) { platform.serviceOn = action.isOn; afterPlatformEdit(draft, platform, snapshot); } return true;
    case "stepMonths":
      if (platform) { platform.months = Math.min(36, Math.max(1, (platform.months || 1) + action.delta)); afterPlatformEdit(draft, platform, snapshot); }
      return true;
    default: return false;
  }
}
