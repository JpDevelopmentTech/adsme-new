"use client";

import { Lock } from "lucide-react";
import { QUOTE_MARGINS_COPY } from "@/constants/quote-summary-copy.constants";
import { formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteMarginsRow } from "@/presentation/components/cotizador/resumen/quote-margins-row";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";

const TITLE_ID = "cotizador-margenes";
const HEAD = "pb-2 text-right text-[11px] font-normal text-text-muted";

/** «Tus márgenes»: lo que gana AdsME por plataforma. Es interno: no sale en la cotización. */
export function QuoteMarginsCard() {
  const { state, reference } = useQuote();
  const figures = useQuoteFigures();
  const { currency, platforms } = state.draft;
  const colorOf = (key: string) => reference.catalog.presets.find((preset) => preset.key === key)?.color;

  return (
    <section aria-labelledby={TITLE_ID} className="glass-thick flex flex-col gap-3 rounded-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id={TITLE_ID} className="text-[15px] font-normal text-text-primary">{QUOTE_MARGINS_COPY.title}</h2>
        <span className="flex items-center gap-1.5 text-xs text-text-muted">
          <Lock size={12} strokeWidth={1.6} aria-hidden />
          {QUOTE_MARGINS_COPY.note}
        </span>
      </div>
      <table className="w-full table-fixed text-[12.5px]">
        <colgroup><col /><col className="w-11" /><col className="w-[30%]" /><col className="w-[28%]" /></colgroup>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={`${HEAD} text-left`}>{QUOTE_MARGINS_COPY.platform}</th>
            <th scope="col" className={HEAD}>{QUOTE_MARGINS_COPY.pct}</th>
            <th scope="col" className={HEAD}>{QUOTE_MARGINS_COPY.profit}</th>
            <th scope="col" className={HEAD}>{QUOTE_MARGINS_COPY.service}</th>
          </tr>
        </thead>
        <tbody>
          {platforms.length === 0 ? (
            <tr><td colSpan={4} className="py-3 text-text-muted">{QUOTE_MARGINS_COPY.empty}</td></tr>
          ) : (
            platforms.map((platform) => (
              <QuoteMarginsRow
                key={platform.id}
                name={platform.name}
                color={colorOf(platform.key)}
                pct={`${formatQuotePct(platform.fee)}%`}
                profit={figures.byPlatform[platform.id]?.fee ?? 0}
                service={figures.byPlatform[platform.id]?.service ?? 0}
                currency={currency}
              />
            ))
          )}
          {platforms.length ? <QuoteMarginsRow name={QUOTE_MARGINS_COPY.total} pct="" profit={figures.profit} service={figures.service} currency={currency} isTotal /> : null}
        </tbody>
      </table>
    </section>
  );
}
