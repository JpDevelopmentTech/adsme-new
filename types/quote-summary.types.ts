import type { ReactNode, RefObject } from "react";
import type { QuoteCurrency } from "@/domain/entities/quote";
import type { QuotePaymentColumn } from "@/domain/entities/quote-catalog";
import type { QuoteDocument, QuoteDocumentBlock, QuoteDocumentMeta, QuoteDocumentRow } from "@/domain/entities/quote-document";

/** Etiqueta junto a la TRM. */
export interface QuoteTrmTag {
  kind: "official" | "custom";
  label: string;
  /** Tooltip literal con la fecha y el valor oficial. */
  hint: string;
}

/** Nota bajo el total general. */
export interface QuoteGrandNote {
  text: string;
  isWarning: boolean;
}

/** Fila partida en concepto y valor. */
export interface QuoteRowParts {
  concept: string;
  value: string;
}

export interface QuoteTrmFieldProps {
  /** Resalta el campo en ámbar: se intentó pasar a USD sin TRM. */
  isNeeded: boolean;
  onEdit: () => void;
  fieldRef: RefObject<HTMLDivElement | null>;
}

export interface QuoteTrmTagButtonProps {
  tag: QuoteTrmTag;
  /** Vuelve a la TRM oficial; sin ella la etiqueta solo informa. */
  onApplyOfficial?: () => void;
}

export interface QuoteSettingsPanelProps {
  id: string;
}

export interface QuoteCurrencySwitchProps {
  onMissingTrm: () => void;
}

export interface QuoteGrandHeadingProps {
  titleId: string;
  isFixed: boolean;
  onRelease: () => void;
}

export interface QuoteGrandNoteProps {
  note: QuoteGrandNote;
}

export interface QuoteMoneyFigureProps {
  label: string;
  value: number;
  currency: QuoteCurrency;
  /** Clase de color del valor (ganancia, descuento…). */
  tone?: string;
}

/** Tramo de una barra proporcional. */
export interface QuoteShareSegment {
  label: string;
  value: number;
  color: string;
}

export interface QuoteShareBarProps {
  label: string;
  segments: QuoteShareSegment[];
  currency: QuoteCurrency;
}

export interface QuoteMarginsRowProps {
  name: string;
  /** Color de la plataforma; la fila del total no lo lleva. */
  color?: string;
  pct: string;
  profit: number;
  service: number;
  currency: QuoteCurrency;
  isTotal?: boolean;
}

export interface QuotePaperProps {
  document: QuoteDocument;
}

export interface QuotePaperBlockProps {
  block: QuoteDocumentBlock;
  isUsd: boolean;
}

export interface QuotePaperRowProps {
  row: QuoteDocumentRow;
  isUsd: boolean;
}

/** Lo que exponen las salidas de la cotización a sus botones. */
export interface QuoteOutputs {
  copyWhatsapp: () => void;
  copyDoc: () => void;
  copyMarker: () => void;
  printPdf: () => void;
  save: () => void;
  isCopied: boolean;
  /** Texto que no se pudo copiar, para seleccionarlo a mano. */
  fallbackText: string | null;
  /** Momento en que se pidió el PDF; fecha y referencia salen de aquí. */
  printedAt: Date | null;
}

/** Copia al portapapeles con confirmación y texto de respaldo. */
export interface QuoteClipboard {
  copy: (text: string, okMessage: string) => Promise<void>;
  isCopied: boolean;
  fallbackText: string | null;
}

/** Impresión de la hoja del PDF. */
export interface QuotePrinter {
  printedAt: Date | null;
  print: (client: string) => void;
}

export interface QuoteActionsProps {
  outputs: QuoteOutputs;
}

export interface QuoteSplitButtonProps {
  label: string;
  hint: string;
  onClick: () => void;
  menuLabel: string;
  children: ReactNode;
}

export interface QuoteMenuItemProps {
  label: string;
  hint?: string;
  onSelect: () => void;
}

export interface QuoteFallbackTextProps {
  text: string;
}

export interface QuotePrintSheetProps {
  document: QuoteDocument;
  printedAt: Date | null;
}

export interface QuotePrintDetailsProps {
  meta: QuoteDocumentMeta[];
}

export interface QuotePrintHeaderProps {
  printedAt: Date | null;
}

export interface QuotePrintSectionProps {
  title: string;
  children: ReactNode;
}

export interface QuotePrintBlockProps {
  block: QuoteDocumentBlock;
}

export interface QuotePrintTotalProps {
  amount: string;
}

export interface QuotePrintPaymentsProps {
  columns: QuotePaymentColumn[];
}

export interface QuotePrintFooterProps {
  client: string;
  project: string;
  subtitle: string;
}

export interface QuoteMobileNavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
