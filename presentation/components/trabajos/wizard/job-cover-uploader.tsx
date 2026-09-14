"use client";

import { CloudUpload, X } from "lucide-react";
import type { DragEvent } from "react";
import { AVATAR_ACCEPTED_TYPES } from "@/constants/client-form.constants";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import type { JobCoverUploaderProps } from "@/types/job-wizard.types";

/** Zona cuadrada de carga de la portada: acepta clic y arrastrar-soltar. */
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
    <div className="flex w-full flex-col gap-3 lg:w-[300px] lg:shrink-0">
      <p className="text-[13px] font-medium text-text-secondary">
        {JOB_WIZARD_COPY.coverLabel}
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        aria-label={JOB_WIZARD_COPY.coverTitle}
        className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-3.5 overflow-hidden rounded-md border border-border-strong bg-card-elevated p-5 transition-colors hover:border-brand-violet/70"
      >
        {previewUrl ? (
          // Blob local del navegador: `next/image` no aplica.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <>
            <span className="grid size-14 place-items-center rounded-pill bg-brand-violet/12">
              <CloudUpload size={26} className="text-brand-violet" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {JOB_WIZARD_COPY.coverTitle}
            </span>
            <span className="text-center text-xs leading-[1.4] text-text-muted">
              {JOB_WIZARD_COPY.coverHint}
            </span>
          </>
        )}
      </button>

      {error ? <p className="text-xs text-danger">{error}</p> : null}

      {previewUrl ? (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="flex w-fit cursor-pointer items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <X size={13} aria-hidden />
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
