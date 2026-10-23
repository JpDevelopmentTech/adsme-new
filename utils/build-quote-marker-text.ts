import { QUOTE_MARKER_ASK } from "@/constants/quote-summary-copy.constants";
import type { QuoteDraft } from "@/domain/entities/quote";
import type { QuoteDocument } from "@/domain/entities/quote-document";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import { moneyContext } from "@/domain/use-cases/quote/quote-grand-total";
import { formatCopEquivalent } from "@/utils/format-cop-equivalent";
import { formatQuoteTrmText } from "@/utils/format-quote-trm-text";

/**
 * Consulta de alcance para el Marker: solo la pauta real de cada plataforma y
 * su duración, sin %, servicio ni total al cliente.
 */
export function buildQuoteMarkerText(document: QuoteDocument, draft: QuoteDraft): string {
  const isUsd = draft.currency === "USD";
  const money = (value: number) => formatQuoteMoney(value, draft.currency);
  const eq = (value: number) => (isUsd ? ` = ${formatCopEquivalent(value * draft.settings.trm)}` : "");
  const trm = formatQuoteTrmText(draft.settings.trm);
  let text = `*${document.title}*\n*${QUOTE_MARKER_ASK}*\n\n`;
  if (isUsd) text += `_Valores en USD · TRM: ${trm} por dólar_\n\n`;
  if (document.meta.length) text += `${document.meta.map((item) => `${item.label}: ${item.value}`).join("\n")}\n`;
  if (document.notes) text += `\nDescripción:\n${document.notes}\n`;
  let total = 0;
  draft.platforms.forEach((platform) => {
    const figures = calculateQuotePlatform(platform, moneyContext(draft));
    const months = platform.months || 1;
    const lines = platform.lines.map((line, index) => {
      const label = line.label.trim() || (platform.lines.length > 1 ? `Campaña ${index + 1}` : "Presupuesto");
      return `${label}: ${money(figures.lineValues[index])}${eq(figures.lineValues[index])}`;
    });
    total += figures.pauta;
    text += `\n*${platform.name}*\nDuración: ${Math.max(1, months)} ${months > 1 ? "meses" : "mes"}\n${lines.join("\n")}\n`;
    if (platform.lines.length > 1) text += `*Total pauta ${platform.name}: ${money(figures.pauta)}${eq(figures.pauta)}*\n`;
    if (platform.notes.trim()) text += `_${platform.notes.trim().replace(/\n+/g, " ")}_\n`;
  });
  text += `\n*Total pauta: ${money(total)}${eq(total)}*`;
  if (isUsd) text += `\n_TRM utilizada: ${trm}_`;
  return text;
}
