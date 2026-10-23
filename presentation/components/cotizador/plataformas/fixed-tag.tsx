import { PLATFORM_BODY_COPY } from "@/constants/quote-platforms-copy.constants";
import type { FixedTagProps } from "@/types/quote-platforms.types";

/** Marca «Fijo»/«Fija»: dice qué cifra manda y se mantiene al cambiar descuentos. */
export function FixedTag({ label }: FixedTagProps) {
  return (
    <span title={PLATFORM_BODY_COPY.fixedTitle} className="rounded-pill bg-lilac/12 px-2 py-0.5 text-[11px] text-lilac">
      {label}
    </span>
  );
}
