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
    <div className="flex w-[132px] shrink-0 flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        aria-label={JOB_WIZARD_COPY.coverTitle}
        className="flex size-[132px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-tile border border-border-strong bg-g-100 p-3 transition-colors duration-150 hover:border-ink"
      >
        {previewUrl ? (
          // Blob local del navegador: `next/image` no aplica.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <>
            <ImagePlus size={22} strokeWidth={1.5} className="text-text-muted" aria-hidden />
            <span className="text-center text-[11.5px] text-text-secondary">
              {JOB_WIZARD_COPY.coverTitle}
            </span>
            <span className="text-center text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {JOB_WIZARD_COPY.coverHint}
            </span>
          </>
        )}
      </button>

      {error ? <p className="text-[11px] text-danger">{error}</p> : null}

      {previewUrl ? (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-sm text-[11.5px] text-text-secondary transition-colors duration-150 hover:text-text-primary"
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
