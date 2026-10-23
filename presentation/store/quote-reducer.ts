import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { moneyContext } from "@/domain/use-cases/quote/quote-grand-total";
import { reduceCampaign } from "@/presentation/store/quote-campaign-reducer";
import { reduceClients } from "@/presentation/store/quote-clients-reducer";
import { reduceLine } from "@/presentation/store/quote-line-reducer";
import { reduceMoney } from "@/presentation/store/quote-money-reducer";
import { reducePlatform } from "@/presentation/store/quote-platform-reducer";
import type { QuoteAction, QuoteState } from "@/types/quote-store.types";

/**
 * Reducer del cotizador. Cada acción trabaja sobre una copia del borrador y
 * delega en las reglas del dominio; los avisos salen como toast.
 */
export function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  if (action.type === "toast") return { ...state, toast: { id: Date.now(), message: action.message } };
  if (action.type === "dismissToast") return { ...state, toast: null };
  if (action.type === "clearSnapshot") return { ...state, snapshot: null };
  if (action.type === "takeSnapshot") {
    const ctx = moneyContext(state.draft);
    const snapshot = Object.fromEntries(state.draft.platforms.map((p) => [p.id, Math.max(0, calculateQuotePlatform(p, ctx).total)]));
    return { ...state, snapshot };
  }

  const fromClients = reduceClients(state, action);
  if (fromClients) return fromClients;

  let toast = state.toast;
  const notify = (message: string) => { toast = { id: Date.now(), message }; };
  const draft = structuredClone(state.draft);

  const fromMoney = reduceMoney(draft, action, state.snapshot, notify);
  if (fromMoney) return { ...state, draft: fromMoney, toast };
  if (reduceCampaign(draft, action) || reducePlatform(draft, action, state.snapshot, notify) || reduceLine(draft, action, state.snapshot, notify)) {
    return { ...state, draft, toast };
  }
  return state;
}
