import type { QuoteNumberKind } from "@/utils/parse-quote-number";

export interface QuoteNumberFieldProps {
  /** Valor actual; `null` deja el campo vacío. */
  value: number | null;
  kind: QuoteNumberKind;
  label: string;
  /** Muestra la etiqueta encima; si no, solo como nombre accesible. */
  isLabelVisible?: boolean;
  onValueChange: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  /** `lg` para el total general y el presupuesto; `sm` para celdas compactas. */
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
}
