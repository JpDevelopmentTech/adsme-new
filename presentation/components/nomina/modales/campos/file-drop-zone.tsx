"use client";

import { Paperclip, UploadCloud } from "lucide-react";
import type { FileDropZoneProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";

/** Zona para adjuntar un archivo: muestra el nombre elegido y «Cambiar archivo». */
export function FileDropZone({ id, fileName, onChange, emptyLabel, changeLabel }: FileDropZoneProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-[72px] cursor-pointer items-center gap-2.5 rounded-md border border-dashed px-4 text-sm font-light transition-colors focus-within:ring-2 focus-within:ring-lilac",
        fileName ? "border-lilac/60 bg-lilac/10 text-text-primary" : "justify-center border-border-strong bg-card-elevated text-text-secondary hover:text-text-primary",
      )}
    >
      {fileName ? <Paperclip size={16} strokeWidth={1.5} aria-hidden className="shrink-0 text-lilac" /> : <UploadCloud size={16} strokeWidth={1.5} aria-hidden />}
      <span className={cn("truncate", fileName && "flex-1")}>{fileName ?? emptyLabel}</span>
      {fileName ? <span className="shrink-0 text-xs text-lilac">{changeLabel}</span> : null}
      <input id={id} type="file" className="sr-only" onChange={(event) => onChange(event.target.files?.[0]?.name ?? fileName)} />
    </label>
  );
}
