"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import { useQuote } from "@/presentation/hooks/use-quote";
import { formatQuoteClientDate } from "@/utils/format-quote-client-date";
import { slugifyClientName } from "@/utils/slugify-client-name";

/** Junto al artista: «Cliente guardado · fecha» si ya existe, o cuántos clientes hay guardados. */
export function ClientStatePill() {
  const { state } = useQuote();
  const name = state.draft.artist.trim();
  const match = name ? state.clients.find((client) => client.slug === slugifyClientName(name)) : undefined;

  if (match) return <StatusBadge tone="success" label={CAMPAIGN_COPY.artist.savedPill(formatQuoteClientDate(match.updatedAt))} />;
  if (!state.clients.length) return null;
  return <span className="text-xs text-text-muted">{CAMPAIGN_COPY.artist.savedCount(state.clients.length)}</span>;
}
