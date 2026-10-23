import type { QuoteDraft } from "@/domain/entities/quote";
import { createBlankQuote } from "@/domain/use-cases/quote/create-quote-draft";
import { formatQuoteMoney, formatTrm } from "@/domain/use-cases/quote/format-quote-money";
import { fixGrand, moneyContext, rebalanceOthers, type QuoteShareSnapshot } from "@/domain/use-cases/quote/quote-grand-total";
import { syncPlatformTotal } from "@/domain/use-cases/quote/quote-platform-sync";
import type { QuoteAction } from "@/types/quote-store.types";

/** Tarifas, TRM, moneda y total general. Devuelve el borrador nuevo o `null` si no aplica. */
export function reduceMoney(draft: QuoteDraft, action: QuoteAction, snapshot: QuoteShareSnapshot, notify: (message: string) => void): QuoteDraft | null {
  switch (action.type) {
    case "replace": return action.draft;
    case "new": notify("Cotización en blanco"); return { ...createBlankQuote(draft.settings, draft.currency), sections: draft.sections };
    case "setSettings": {
      const previousFee = draft.settings.fee;
      if (action.fee !== undefined) {
        draft.settings.fee = Math.min(99, action.fee);
        draft.platforms.forEach((platform) => { if (platform.fee === previousFee) platform.fee = draft.settings.fee; });
      }
      if (action.serviceCop !== undefined) draft.settings.service.COP = action.serviceCop;
      if (action.serviceUsd !== undefined) draft.settings.service.USD = action.serviceUsd;
      draft.platforms.forEach((platform) => syncPlatformTotal(platform, moneyContext(draft)));
      return draft;
    }
    case "setTrm": draft.settings.trm = action.value; draft.trmManual = action.isManual; return draft;
    case "setCurrency": {
      if (action.currency === "USD" && !draft.settings.trm) { notify("Escribe primero la TRM para convertir a dólares"); return draft; }
      draft.currency = action.currency;
      const service = formatQuoteMoney(draft.settings.service[action.currency], action.currency);
      notify(action.currency === "USD" ? `Precios convertidos con TRM ${formatTrm(draft.settings.trm)}. Servicio fijo: ${service}` : `De vuelta en pesos. Servicio fijo: ${service}`);
      return draft;
    }
    case "setGrand": {
      fixGrand(draft, action.value);
      if (draft.platforms.length === 0) return draft;
      if (draft.platforms.every((platform) => platform.locked)) { notify("Todas las plataformas tienen candado"); return draft; }
      if (draft.platforms.length === 1) { draft.platforms[0].anchor = "total"; draft.platforms[0].total = draft.grand; return draft; }
      rebalanceOthers(draft, null, snapshot);
      return draft;
    }
    case "releaseGrand": draft.grandFixed = false; notify("El total general vuelve a ser la suma de las plataformas"); return draft;
    default: return null;
  }
}
