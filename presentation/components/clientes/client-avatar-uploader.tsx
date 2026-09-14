"use client";

import { ImagePlus, X } from "lucide-react";
import type { DragEvent } from "react";
import { AVATAR_ACCEPTED_TYPES } from "@/constants/client-form.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import type { ClientAvatarUploaderProps } from "@/types/client-form.types";

/** Zona de carga de la foto del cliente: acepta clic y arrastrar-soltar. */
export function ClientAvatarUploader({
  previewUrl,
  error,
  onSelect,
  inputRef,
}: ClientAvatarUploaderProps) {
  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0] ?? null;

    if (file && inputRef.current) {
      inputRef.current.files = event.dataTransfer.files;
    }
    onSelect(file);
  };

  return (
    <div className="flex items-center gap-[18px]">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        aria-label={CLIENT_FORM_COPY.avatarTitle}
        className="grid size-24 shrink-0 cursor-pointer place-items-center gap-1.5 overflow-hidden rounded-md border border-border-strong bg-card-elevated transition-colors hover:border-brand-violet/70"
      >
        {previewUrl ? (
          // Blob local o URL de Storage: `next/image` no aporta aquí.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <>
            <ImagePlus size={24} strokeWidth={1.75} className="text-text-secondary" aria-hidden />
            <span className="text-[11px] text-text-muted">
              {CLIENT_FORM_COPY.avatarUpload}
            </span>
          </>
        )}
      </button>

      <div className="flex flex-col gap-[5px]">
        <p className="text-sm font-semibold text-text-primary">
          {CLIENT_FORM_COPY.avatarTitle}
        </p>
        <p className="text-xs leading-[1.4] text-text-muted">
          {CLIENT_FORM_COPY.avatarHint}
        </p>
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {previewUrl ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-1 flex w-fit cursor-pointer items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <X size={13} aria-hidden />
            {CLIENT_FORM_COPY.avatarRemove}
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        name={CLIENT_FORM_FIELDS.avatar}
        accept={AVATAR_ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
