import type { QuoteDraft, QuotePlatform } from "@/domain/entities/quote";
import type { QuoteDocument, QuoteDocumentBlock, QuoteDocumentMeta, QuoteDocumentRow } from "@/domain/entities/quote-document";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { formatQuoteMoney, formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { grandSum, moneyContext } from "@/domain/use-cases/quote/quote-grand-total";
import { describeAges, describeTargetPlaces } from "@/domain/use-cases/quote/describe-quote-audience";

/** Filas de una plataforma: líneas de pauta, comisión, servicio y sus descuentos. */
function platformBlock(draft: QuoteDraft, platform: QuotePlatform): QuoteDocumentBlock {
  const figures = calculateQuotePlatform(platform, moneyContext(draft));
  const money = (value: number) => formatQuoteMoney(value, draft.currency);
  const isUsd = draft.currency === "USD";
  const rows: QuoteDocumentRow[] = [];

  platform.lines.forEach((line, index) => {
    const value = figures.lineValues[index];
    if (!value && !line.label.trim()) return;
    const label = line.label.trim() || (platform.lines.length > 1 ? `Campaña ${index + 1}` : "Inversión");
    rows.push({ text: `${label}: ${money(value)}`, copEquivalent: isUsd ? value * draft.settings.trm : null, isDiscount: false });
  });
  if (figures.feeStandard) rows.push({ text: `${formatQuotePct(figures.shownPct)}% de la inversión: ${money(figures.feeStandard)}`, copEquivalent: null, isDiscount: false });
  if (figures.feeDiscount > 0.004) rows.push({ text: `Descuento ${figures.shownPct}% (se cobra ${formatQuotePct(Math.max(0, platform.fee))}%): ${money(figures.feeDiscount)}`, copEquivalent: null, isDiscount: true });
  if (figures.serviceGross) rows.push({ text: `Servicio (${figures.months} ${figures.months === 1 ? "mes" : "meses"}): ${money(figures.serviceGross)}`, copEquivalent: null, isDiscount: false });
  if (figures.serviceDiscount > 0.004) {
    const label = figures.service <= 0.004 ? "Descuento servicio (no se cobra)" : "Descuento servicio";
    rows.push({ text: `${label}: ${money(figures.serviceDiscount)}`, copEquivalent: null, isDiscount: true });
  }

  return { name: platform.name, rows, totalText: `Total ${platform.name}: ${money(figures.total)}`, note: platform.notes.trim() };
}

/** Datos de la campaña en el orden de la cotización. */
function campaignMeta(draft: QuoteDraft, placeName: (code: string) => string): QuoteDocumentMeta[] {
  const meta: QuoteDocumentMeta[] = [];
  if (draft.project.trim()) meta.push({ label: "Proyecto", value: draft.project.trim(), isProject: true });
  draft.targets.forEach((target) => {
    const places = describeTargetPlaces(target, placeName);
    if (places) meta.push({ label: `Target${target.pct !== null ? ` ${formatQuotePct(target.pct)}%` : ""}`, value: places, isProject: false });
  });
  if (draft.sex !== "Todos") meta.push({ label: "Público", value: draft.sex, isProject: false });
  const ages = describeAges(draft.ageFrom, draft.ageTo);
  if (ages) meta.push({ label: "Edades", value: ages, isProject: false });
  if (draft.genres.length) meta.push({ label: "Género", value: draft.genres.join(", "), isProject: false });
  if (draft.interests.length) meta.push({ label: "Intereses", value: draft.interests.join(", "), isProject: false });
  return meta;
}

/**
 * Arma la cotización tal como la recibe el cliente: título, datos de campaña,
 * un bloque por plataforma, total general (suma de plataformas), condiciones y
 * la entidad de la que se retira el pago.
 */
export function buildQuoteDocument(draft: QuoteDraft, placeName: (code: string) => string, entities: Record<"COP" | "USD", string>): QuoteDocument {
  const client = draft.artist.trim() || "Cliente";

  return {
    client,
    title: `${client} x AdsME`,
    subtitle: "Cotización de Campaña Digital",
    meta: campaignMeta(draft, placeName),
    notes: draft.notes.trim(),
    blocks: draft.platforms.map((platform) => platformBlock(draft, platform)),
    grandText: `Total General: ${formatQuoteMoney(grandSum(draft), draft.currency)}`,
    terms: draft.terms.trim(),
    entityName: entities[draft.entity ?? draft.currency],
    usdTrm: draft.currency === "USD" ? draft.settings.trm : null,
  };
}
