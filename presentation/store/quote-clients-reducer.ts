import type { QuoteAction, QuoteState } from "@/types/quote-store.types";
import { slugifyClientName } from "@/utils/slugify-client-name";

/**
 * Clientes guardados: guardar la cotización actual con su total y cargar la
 * última de un cliente. Sin base de datos todavía, viven en esta sesión.
 * Devuelve `null` si la acción no es suya.
 */
export function reduceClients(state: QuoteState, action: QuoteAction): QuoteState | null {
  const toast = (message: string) => ({ id: Date.now(), message });

  if (action.type === "saveClient") {
    const name = state.draft.artist.trim();
    if (!name) return action.isSilent ? state : { ...state, toast: toast("Escribe el nombre del cliente para guardar") };
    const slug = slugifyClientName(name);
    const previous = state.clients.find((client) => client.slug === slug);
    const saved = {
      slug, name, updatedAt: new Date().toISOString().slice(0, 10), total: action.totalText,
      currency: state.draft.currency, count: (previous?.count ?? 0) + 1, draft: structuredClone(state.draft),
    };
    const clients = [saved, ...state.clients.filter((client) => client.slug !== slug)];
    return { ...state, clients, toast: action.isSilent ? state.toast : toast(`Cotización de ${name} guardada`) };
  }

  if (action.type === "loadClient") {
    const client = state.clients.find((item) => item.slug === action.slug);
    if (!client?.draft) return { ...state, toast: toast("No se pudo abrir esa cotización") };
    return { ...state, draft: structuredClone(client.draft), toast: toast(`Cargada la última cotización de ${client.name}`) };
  }

  return null;
}
