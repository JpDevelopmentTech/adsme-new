"use client";

import { PLATFORM_FEES_COPY as COPY, QUOTE_MONEY_EPSILON } from "@/constants/quote-platforms-copy.constants";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { QuoteNumberField } from "@/presentation/components/cotizador/campos/quote-number-field";
import { ChargeSwitch } from "@/presentation/components/cotizador/plataformas/charge-switch";
import { FieldHeading } from "@/presentation/components/cotizador/plataformas/field-heading";
import { FigureRow } from "@/presentation/components/cotizador/plataformas/figure-row";
import { MonthsStepper } from "@/presentation/components/cotizador/plataformas/months-stepper";
import { useQuote } from "@/presentation/hooks/use-quote";
import { useQuoteSnapshot } from "@/presentation/hooks/use-quote-snapshot";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";
import { formatQuoteMonths } from "@/utils/format-quote-months";

/** «Servicio Marker»: si se cobra, cuántos meses y su descuento en % o en dinero. */
export function PlatformServiceBlock({ platform, figures }: PlatformFiguresProps) {
  const { state, dispatch } = useQuote();
  const snapshot = useQuoteSnapshot();
  const { currency } = state.draft;
  const isOn = platform.serviceOn;
  const money = (value: number) => formatQuoteMoney(value, currency);
  const set = (field: "serviceDiscountPct" | "serviceDiscount", value: number) => dispatch({ type: "setPlatformField", platformId: platform.id, field, value });
  const toggle = <ChargeSwitch label={COPY.serviceCharge} isOn={isOn} onChange={(next) => dispatch({ type: "setServiceOn", platformId: platform.id, isOn: next })} />;

  return (
    <div className={cn("glass-panel flex flex-col gap-3 rounded-tile p-4", figures.serviceDiscount > QUOTE_MONEY_EPSILON && "ring-1 ring-warning/45 ring-inset")}>
      <FieldHeading label={COPY.serviceTitle} trailing={toggle} />
      <MonthsStepper platformId={platform.id} months={figures.months} />
      <div className="grid grid-cols-2 gap-2">
        <QuoteNumberField value={isOn ? platform.serviceDiscountPct : 100} kind="pct" label={COPY.serviceDiscountPct} isLabelVisible isDisabled={!isOn} onValueChange={(value) => set("serviceDiscountPct", value)} {...snapshot} />
        <QuoteNumberField value={isOn ? figures.serviceDiscount : figures.serviceGross} kind={currency} label={COPY.serviceDiscount} isLabelVisible isDisabled={!isOn} onValueChange={(value) => set("serviceDiscount", value)} {...snapshot} />
      </div>
      <div className="flex flex-col gap-1.5 border-t border-border pt-3">
        <FigureRow label={`${COPY.serviceGross} (${formatQuoteMonths(figures.months)})`} value={`${money(figures.serviceGross)}${isOn ? "" : COPY.notCharged}`} />
        <FigureRow label={COPY.serviceResult} value={money(figures.service)} isStrong />
      </div>
    </div>
  );
}
