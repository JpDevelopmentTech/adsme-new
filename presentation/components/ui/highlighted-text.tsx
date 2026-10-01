import type { HighlightedTextProps } from "@/types/global-search.types";
import { splitHighlight } from "@/utils/split-highlight";

/** Texto con la parte que coincide con la búsqueda en lila y un peso más. */
export function HighlightedText({ text, term }: HighlightedTextProps) {
  return (
    <>
      {splitHighlight(text, term).map((part, index) =>
        part.isMatch ? (
          <mark key={index} className="bg-transparent font-normal text-lilac">
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}
