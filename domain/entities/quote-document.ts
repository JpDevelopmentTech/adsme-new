/** Dato de la campaña que sale en la cotización: «Proyecto», «Target 50%», etc. */
export interface QuoteDocumentMeta {
  label: string;
  value: string;
  isProject: boolean;
}

/** Fila de una plataforma en la cotización. */
export interface QuoteDocumentRow {
  text: string;
  /** Equivalente en COP de una línea de pauta cuando se cotiza en USD. */
  copEquivalent: number | null;
  isDiscount: boolean;
}

export interface QuoteDocumentBlock {
  name: string;
  rows: QuoteDocumentRow[];
  totalText: string;
  note: string;
}

/** La cotización tal como la recibe el cliente. */
export interface QuoteDocument {
  client: string;
  title: string;
  subtitle: string;
  meta: QuoteDocumentMeta[];
  notes: string;
  blocks: QuoteDocumentBlock[];
  grandText: string;
  terms: string;
  entityName: string;
  /** TRM con la que se convirtió, si la cotización va en USD. */
  usdTrm: number | null;
}
