"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { ClientOptionProps } from "@/types/quote-campaign.types";
import { cn } from "@/utils/cn";
import { formatQuoteClientDate } from "@/utils/format-quote-client-date";

/**
 * Cliente guardado en el desplegable del artista. La fila solo pone el nombre;
 * «Cargar» trae su última cotización completa.
 */
export function ClientOption({ id, client, isActive, onHover, onPick, onLoad }: ClientOptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      onMouseEnter={onHover}
      onClick={onPick}
      className={cn(
        "flex min-h-12 cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors",
        isActive ? "bg-white/10" : "hover:bg-white/5",
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm text-text-primary">{client.name}</span>
        <small className="truncate text-xs text-text-muted tabular-nums">
          {CAMPAIGN_COPY.artist.meta(formatQuoteClientDate(client.updatedAt), client.total, client.count)}
        </small>
      </span>
      <button
        type="button"
        tabIndex={-1}
        onClick={(event) => {
          event.stopPropagation();
          onLoad();
        }}
        className="h-9 shrink-0 cursor-pointer rounded-pill border border-border bg-surface px-3.5 text-xs text-text-primary transition-colors hover:border-border-strong hover:bg-white/10"
      >
        {CAMPAIGN_COPY.artist.load}
      </button>
    </li>
  );
}
