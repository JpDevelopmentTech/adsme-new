import { PLATFORM_BODY_COPY } from "@/constants/quote-platforms-copy.constants";

/** Etiqueta de una línea en el resumen plegado: la escrita, «Campaña {n}» con varias o «Pauta». */
export function quoteLineDisplayLabel(label: string, index: number, count: number): string {
  const written = label.trim();
  if (written) return written;
  return count > 1 ? `${PLATFORM_BODY_COPY.multiLinePrefix} ${index + 1}` : PLATFORM_BODY_COPY.defaultLine;
}
