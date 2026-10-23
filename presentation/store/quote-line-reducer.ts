import type { QuoteDraft } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { createQuoteLine } from "@/domain/use-cases/quote/create-quote-draft";
import { formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { moneyContext, type QuoteShareSnapshot } from "@/domain/use-cases/quote/quote-grand-total";
import { setLineAmountPauta, setLineShare } from "@/domain/use-cases/quote/quote-line-shares";
import { toCop } from "@/domain/use-cases/quote/quote-money";
import { materializeLines, syncPlatformTotal } from "@/domain/use-cases/quote/quote-platform-sync";
import { afterPlatformEdit } from "@/presentation/store/quote-after-edit";
import type { QuoteAction } from "@/types/quote-store.types";

/** Líneas de pauta: agregar, quitar, etiqueta, monto, % y candado del %. */
export function reduceLine(draft: QuoteDraft, action: QuoteAction, snapshot: QuoteShareSnapshot, notify: (message: string) => void): boolean {
  const ctx = moneyContext(draft);
  const platform = "platformId" in action ? draft.platforms.find((item) => item.id === action.platformId) : undefined;
  if (!platform) return false;
  const line = "lineId" in action ? platform.lines.find((item) => item.id === action.lineId) : undefined;

  switch (action.type) {
    case "addLine": syncPlatformTotal(platform, ctx); platform.lines.push(createQuoteLine()); return true;
    case "removeLine": platform.lines = platform.lines.filter((item) => item.id !== action.lineId); afterPlatformEdit(draft, platform, snapshot); return true;
    case "setLineLabel": if (line) line.label = action.label; return true;
    case "setLineAmount": {
      if (!line) return true;
      if (platform.locked && platform.lines.length === 1) return true;
      if (platform.anchor === "total" && platform.lines.length > 1) setLineShare(platform, line.id, action.value, ctx);
      else {
        if (platform.anchor === "total") { materializeLines(platform, ctx); platform.anchor = "pauta"; }
        if (platform.lines.length > 1) setLineAmountPauta(platform, line.id, action.value, ctx);
        else line.amount = toCop(action.value, ctx);
      }
      afterPlatformEdit(draft, platform, snapshot);
      return true;
    }
    case "setLinePct": {
      if (!line || platform.lines.length < 2) return true;
      const { pauta } = calculateQuotePlatform(platform, ctx);
      setLineShare(platform, line.id, (pauta * Math.min(100, Math.max(0, action.pct))) / 100, ctx);
      afterPlatformEdit(draft, platform, snapshot);
      return true;
    }
    case "toggleLineLock": {
      if (!line) return true;
      if (!line.locked && !platform.lines.some((item) => item !== line && !item.locked)) {
        notify("Deja al menos una línea sin candado para poder ajustar");
        return true;
      }
      const figures = calculateQuotePlatform(platform, ctx);
      const index = platform.lines.indexOf(line);
      line.locked = !line.locked;
      if (line.locked) line.lockPct = figures.pauta > 0 ? figures.lineValues[index] / figures.pauta : 0;
      notify(line.locked ? `% bloqueado en ${formatQuotePct(line.lockPct * 100)}%` : "Candado quitado");
      return true;
    }
    default: return false;
  }
}
