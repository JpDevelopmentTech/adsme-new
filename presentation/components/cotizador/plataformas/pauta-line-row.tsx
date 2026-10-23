"use client";

import { X } from "lucide-react";
import { PLATFORM_BODY_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { isLineLocked } from "@/domain/use-cases/quote/quote-line-shares";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { LockToggle } from "@/presentation/components/cotizador/plataformas/lock-toggle";
import { IconButton } from "@/presentation/components/ui/icon-button";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { PautaLineRowProps } from "@/types/quote-platforms.types";
import { quoteSharePct } from "@/utils/quote-share-pct";

/** Fila de una línea de pauta: resultado, candado del %, %, monto y quitar. */
export function PautaLineRow({ platform, figures, line, index, placeholder }: PautaLineRowProps) {
  const { state, dispatch } = useQuote();
  const snapshot = useQuoteSnapshot();
  const ids = { platformId: platform.id, lineId: line.id };
  const isSingle = platform.lines.length === 1;
  const isLocked = isLineLocked(platform, line.id);
  const value = figures.lineValues[index] ?? 0;
  const pct = isSingle ? 100 : quoteSharePct(value, figures.pauta);

  return (
    <li className="grid grid-cols-[auto_88px_minmax(0,1fr)_auto] items-end gap-2 sm:grid-cols-[minmax(0,1fr)_auto_96px_minmax(0,180px)_auto]">
      <input
        type="text"
        value={line.label}
        aria-label={COPY.lineLabel}
        placeholder={`${placeholder}${COPY.optionalSuffix}`}
        onChange={(event) => dispatch({ type: "setLineLabel", ...ids, label: event.target.value })}
        className="glass-field col-span-4 h-11 min-w-0 rounded-md px-3.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac sm:col-span-1"
      />
      <LockToggle isLocked={isLocked} isHidden={isSingle} label={COPY.lineLock} lockTitle={COPY.lineLockTitle} unlockTitle={COPY.lineUnlockTitle} onToggle={() => dispatch({ type: "toggleLineLock", ...ids })} />
      <span title={COPY.linePctTitle} className="min-w-0">
        <QuoteNumberField value={pct} kind="pct" label={COPY.linePct} isDisabled={isSingle} isReadOnly={isLocked} onValueChange={(next) => dispatch({ type: "setLinePct", ...ids, pct: next })} {...snapshot} />
      </span>
      <QuoteNumberField
        value={platform.anchor === "pauta" && !line.amount ? null : value}
        kind={state.draft.currency}
        label={COPY.lineAmount}
        isReadOnly={isLocked || (platform.locked && isSingle)}
        onValueChange={(next) => dispatch({ type: "setLineAmount", ...ids, value: next })}
        {...snapshot}
      />
      {isSingle ? <span aria-hidden className="w-10" /> : <IconButton icon={<X size={16} strokeWidth={1.75} aria-hidden />} label={COPY.removeLine} onClick={() => dispatch({ type: "removeLine", ...ids })} />}
    </li>
  );
}
