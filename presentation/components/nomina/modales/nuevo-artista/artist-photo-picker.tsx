"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ARTIST_PHOTO_COPY } from "@/constants/nomina-modales-copy.constants";
import type { ArtistPhotoPickerProps } from "@/types/nomina-modales-artista.types";
import { cn } from "@/utils/cn";

/** Círculo de la foto: clic para elegir, o arrastrar una imagen encima; previsualiza la elegida. */
export function ArtistPhotoPicker({ photo }: ArtistPhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <button
      type="button"
      aria-label={ARTIST_PHOTO_COPY.upload}
      title={ARTIST_PHOTO_COPY.uploadTitle}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        photo.selectFile(event.dataTransfer.files[0]);
      }}
      className={cn(
        "relative grid size-[52px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-pill border bg-surface text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isDragging ? "border-2 border-dashed border-lilac" : "border-border-strong",
      )}
    >
      {photo.url ? <Image src={photo.url} alt="" fill unoptimized className="object-cover" /> : <ImagePlus size={20} strokeWidth={1.5} aria-hidden />}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => photo.selectFile(event.target.files?.[0])}
      />
    </button>
  );
}
