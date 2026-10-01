"use client";

import { ImagePlus, X } from "lucide-react";
import type { DragEvent } from "react";
import { AVATAR_ACCEPTED_TYPES } from "@/constants/client-form.constants";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import type { JobCoverUploaderProps } from "@/types/job-wizard.types";

/**
 * Zona cuadrada de carga de la portada: acepta clic y arrastrar-soltar. Va al
 * tamaño de la miniatura que se va a ver en el listado, no a media pantalla:
 * ocupar más no ayuda a elegir mejor la imagen.
 */
export function JobCoverUploader({
  previewUrl,
  error,
  onSelect,
  inputRef,
}: JobCoverUploaderProps) {
  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0] ?? null;

    if (file && inputRef.current) {
      inputRef.current.files = event.dataTransfer.files;
    }
    onSelect(file);
  };

  return (
    <div className="flex w-[176px] shrink-0 flex-col items-center gap-2.5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        aria-label={JOB_WIZARD_COPY.coverTitle}
        className="flex size-[176px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-tile border-[1.5px] border-white/30 bg-surface p-3 transition-colors duration-150 hover:border-white/60 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        {previewUrl ? (
          // Blob local del navegador: `next/image` no aplica.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <>
            <ImagePlus size={24} strokeWidth={1.5} className="text-text-secondary" aria-hidden />
            <span className="text-center text-[13px] font-normal text-text-secondary">
              {JOB_WIZARD_COPY.coverTitle}
            </span>
            <span className="text-center text-[11px] font-normal text-text-muted">
              {JOB_WIZARD_COPY.coverHint}
            </span>
          </>
        )}
      </button>

      {error ? <p className="text-xs font-normal text-danger">{error}</p> : null}

      {previewUrl ? (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-sm text-xs font-normal text-danger transition-opacity duration-150 hover:opacity-80"
        >
          <X size={13} strokeWidth={1.5} aria-hidden />
          {JOB_WIZARD_COPY.coverRemove}
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        name="cover"
        accept={AVATAR_ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
