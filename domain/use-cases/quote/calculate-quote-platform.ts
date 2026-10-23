import type { QuotePlatform } from "@/domain/entities/quote";
import type { QuotePlatformFigures } from "@/domain/entities/quote-figures";
import { monthlyService, roundMoney, toView, type QuoteMoneyContext } from "@/domain/use-cases/quote/quote-money";

/** Reparte la pauta entre las líneas según sus montos; la última se lleva el residuo. */
function splitPauta(pauta: number, platform: QuotePlatform, ctx: QuoteMoneyContext): number[] {
  const weights = platform.lines.map((line) => Math.max(0, line.amount));
  const sum = weights.reduce((total, weight) => total + weight, 0);
  let accumulated = 0;

  return weights.map((weight, index) => {
    const isLast = index === weights.length - 1;
    const value = isLast
      ? roundMoney(pauta - accumulated, ctx.currency)
      : sum > 0 ? roundMoney((pauta * weight) / sum, ctx.currency) : index === 0 ? pauta : 0;
    accumulated += value;
    return value;
  });
}

/**
 * Cifras de una plataforma: presupuesto − servicio = valor a trabajar; el % de
 * AdsME sale de ese valor y lo que queda es la pauta real. Si manda la pauta,
 * el cálculo va al revés: valor a trabajar = pauta ÷ (1 − %).
 */
export function calculateQuotePlatform(platform: QuotePlatform, ctx: QuoteMoneyContext): QuotePlatformFigures {
  const { currency, settings } = ctx;
  const feeRate = Math.min(platform.fee, 99.99) / 100;
  const months = Math.max(1, platform.months || 1);
  const serviceMonthly = monthlyService(ctx);
  const serviceGross = roundMoney(serviceMonthly * months, currency);
  const service = platform.serviceOn
    ? roundMoney(serviceGross * (1 - Math.min(100, Math.max(0, platform.serviceDiscountPct)) / 100), currency)
    : 0;

  let total: number;
  let workValue: number;
  let fee: number;
  let pauta: number;
  let lineValues: number[];

  if (platform.anchor === "total") {
    total = roundMoney(toView(platform.total, ctx), currency);
    workValue = total - service;
    fee = roundMoney(feeRate * workValue, currency);
    pauta = workValue - fee;
    lineValues = splitPauta(pauta, platform, ctx);
  } else {
    lineValues = platform.lines.map((line) => roundMoney(toView(line.amount || 0, ctx), currency));
    pauta = lineValues.reduce((sum, value) => sum + value, 0);
    workValue = roundMoney(pauta / (1 - feeRate), currency);
    fee = workValue - pauta;
    total = workValue + service;
  }

  const feeStandard = platform.fee >= settings.fee ? fee : roundMoney((settings.fee / 100) * workValue, currency);
  const feeDiscount = feeStandard - fee;
  const serviceDiscount = serviceGross - service;

  return {
    total, workValue, fee, pauta, lineValues, serviceMonthly, months, serviceGross, service,
    serviceDiscount, feeStandard, feeDiscount, shownPct: Math.max(settings.fee, platform.fee),
    discount: feeDiscount + serviceDiscount,
  };
}
