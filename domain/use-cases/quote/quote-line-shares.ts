import type { QuotePlatform } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { roundMoney, toCop, type QuoteMoneyContext } from "@/domain/use-cases/quote/quote-money";

/** Una línea solo cuenta como bloqueada si hay más de una. */
export function isLineLocked(platform: QuotePlatform, lineId: string): boolean {
  return platform.lines.length > 1 && Boolean(platform.lines.find((line) => line.id === lineId)?.locked);
}

/** Suma de las fracciones fijas de las líneas bloqueadas, salvo `exceptId`. */
export function lockedShare(platform: QuotePlatform, exceptId: string | null): number {
  return platform.lines
    .filter((line) => line.id !== exceptId && isLineLocked(platform, line.id))
    .reduce((sum, line) => sum + line.lockPct, 0);
}

/** Escribe los valores y lleva el descuadre del redondeo a la línea `plug`. */
function writeValues(platform: QuotePlatform, values: number[], pauta: number, plug: number, ctx: QuoteMoneyContext): void {
  const diff = pauta - values.reduce((sum, value) => sum + value, 0);
  values[plug] = roundMoney(values[plug] + diff, ctx.currency);
  platform.lines.forEach((line, index) => {
    line.amount = toCop(values[index], ctx);
  });
}

/**
 * Cambia lo que se lleva una línea sin mover la pauta: las bloqueadas
 * conservan su %, y el resto se reparte entre las libres en proporción.
 */
export function setLineShare(platform: QuotePlatform, lineId: string, value: number, ctx: QuoteMoneyContext): void {
  const figures = calculateQuotePlatform(platform, ctx);
  const pauta = figures.pauta;
  const index = platform.lines.findIndex((line) => line.id === lineId);
  const available = pauta * (1 - Math.min(1, lockedShare(platform, lineId)));
  const others = platform.lines.map((_, i) => i).filter((i) => i !== index && !isLineLocked(platform, platform.lines[i].id));
  const own = others.length ? roundMoney(Math.min(available, Math.max(0, value)), ctx.currency) : roundMoney(available, ctx.currency);
  const values = [...figures.lineValues];
  values[index] = own;

  platform.lines.forEach((line, i) => {
    if (i !== index && isLineLocked(platform, line.id)) values[i] = roundMoney(pauta * line.lockPct, ctx.currency);
  });
  const rest = available - own;
  const othersSum = others.reduce((sum, i) => sum + figures.lineValues[i], 0);
  others.forEach((i) => {
    values[i] = roundMoney(othersSum > 0 ? (figures.lineValues[i] / othersSum) * rest : rest / others.length, ctx.currency);
  });
  writeValues(platform, values, pauta, others.length ? others[others.length - 1] : index, ctx);
}

/** Con la pauta al mando: la pauta crece o encoge y las bloqueadas mantienen su %. */
export function setLineAmountPauta(platform: QuotePlatform, lineId: string, value: number, ctx: QuoteMoneyContext): void {
  const index = platform.lines.findIndex((line) => line.id === lineId);
  const locked = lockedShare(platform, lineId);
  if (locked <= 0 || locked >= 1) {
    platform.lines[index].amount = toCop(value, ctx);
    return;
  }
  const values = [...calculateQuotePlatform(platform, ctx).lineValues];
  values[index] = roundMoney(Math.max(0, value), ctx.currency);
  const free = values.filter((_, i) => i === index || !isLineLocked(platform, platform.lines[i].id)).reduce((sum, v) => sum + v, 0);
  const pauta = roundMoney(free / (1 - locked), ctx.currency);
  let plug = index;
  platform.lines.forEach((line, i) => {
    if (i === index || !isLineLocked(platform, line.id)) return;
    values[i] = roundMoney(pauta * line.lockPct, ctx.currency);
    if (plug === index) plug = i;
  });
  writeValues(platform, values, pauta, plug, ctx);
}
