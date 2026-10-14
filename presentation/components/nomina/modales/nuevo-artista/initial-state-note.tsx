import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";

/** Aviso de que el artista nace en rojo, sin actividad. */
export function InitialStateNote() {
  return (
    <p className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3.5 text-[13px] leading-[1.45] font-light text-text-secondary">
      <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-danger" />
      <span>
        {NEW_ARTIST_COPY.initialStateLead} <span className="text-text-primary">{NEW_ARTIST_COPY.initialStateStrong}</span> {NEW_ARTIST_COPY.initialStateTail}
      </span>
    </p>
  );
}
