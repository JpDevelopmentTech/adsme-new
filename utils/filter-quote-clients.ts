import { MAX_CLIENT_OPTIONS } from "@/constants/quote-campaign.constants";
import type { QuoteStoredClient } from "@/types/quote-store.types";
import { foldSearchText } from "@/utils/fold-search-text";

/** Clientes guardados cuyo nombre contiene lo escrito, sin tildes ni mayúsculas; máximo 30. */
export function filterQuoteClients(clients: QuoteStoredClient[], query: string): QuoteStoredClient[] {
  const needle = foldSearchText(query);
  return clients.filter((client) => foldSearchText(client.name).includes(needle)).slice(0, MAX_CLIENT_OPTIONS);
}
