import type { QuoteDocument, QuoteDocumentBlock } from "@/domain/entities/quote-document";
import { formatCopEquivalent } from "@/utils/format-cop-equivalent";
import { formatQuoteTrmText } from "@/utils/format-quote-trm-text";

/** Bloque de una plataforma con el formato de WhatsApp (`*negrita*`, `_cursiva_`). */
function blockText(block: QuoteDocumentBlock, isUsd: boolean): string {
  const rows = block.rows.map((row) => {
    if (row.isDiscount) return `_${row.text}_`;
    return isUsd && row.copEquivalent !== null ? `${row.text} = ${formatCopEquivalent(row.copEquivalent)}` : row.text;
  });
  const note = block.note ? `_${block.note.replace(/\n+/g, " ")}_\n` : "";
  return `\n*${block.name}*\n${rows.join("\n")}\n*${block.totalText}*\n${note}`;
}

/**
 * Texto base de la cotización. En modo WhatsApp añade la cabecera y la TRM en
 * USD, los equivalentes en pesos de cada línea y la entidad de la que se retira.
 */
export function composeQuoteText(document: QuoteDocument, isWhatsapp: boolean): string {
  const isUsd = isWhatsapp && document.usdTrm !== null;
  const trm = formatQuoteTrmText(document.usdTrm ?? 0);
  let text = `*${document.title}*\n*${document.subtitle}*\n\n`;
  if (isUsd) text += `_Cotización en USD · TRM: ${trm} por dólar_\n\n`;
  if (document.meta.length) text += `${document.meta.map((item) => `${item.label}: ${item.value}`).join("\n")}\n`;
  if (document.notes) text += `\nDescripción:\n${document.notes}\n`;
  text += document.blocks.map((block) => blockText(block, isUsd)).join("");
  text += `\n*${document.grandText}*`;
  if (isUsd) text += `\n_TRM utilizada: ${trm}_`;
  if (document.terms) text += `\n\n*Condiciones y notas*\n${document.terms}`;
  if (isWhatsapp) text += `\n\n*Retirar de ${document.entityName}*`;
  return text;
}
