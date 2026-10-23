import type { FieldHeadingProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Rótulo de un grupo de la tarjeta, con su marca, una nota en voz baja y un control a la derecha. */
export function FieldHeading({ label, tag, note, isNoteWarning = false, trailing }: FieldHeadingProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="text-[13px] text-text-primary">{label}</span>
      {tag}
      {note ? <span className={cn("text-xs", isNoteWarning ? "text-warning" : "text-text-muted")}>{note}</span> : null}
      {trailing ? <span className="ml-auto">{trailing}</span> : null}
    </div>
  );
}
