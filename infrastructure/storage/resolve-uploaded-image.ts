import type { SupabaseClient } from "@supabase/supabase-js";
import { uploadToBucket } from "@/infrastructure/storage/bucket-storage";

export interface ImageSelection {
  file: File | null;
  previousUrl: string | null;
  remove: boolean;
}

export interface ImageResolution {
  /** URL que debe guardarse en la fila. */
  url: string | null;
  /** Imagen anterior a borrar una vez confirmada la escritura en la tabla. */
  discardedUrl: string | null;
}

/**
 * Decide con qué imagen se queda la fila: sube la nueva si la hay, respeta la
 * anterior si no se tocó, o la descarta si el usuario pulsó «Quitar».
 */
export async function resolveUploadedImage(
  supabase: SupabaseClient,
  bucket: string,
  ownerId: string,
  selection: ImageSelection,
): Promise<ImageResolution> {
  if (selection.file && selection.file.size > 0) {
    const url = await uploadToBucket(supabase, bucket, ownerId, selection.file);
    return { url, discardedUrl: selection.previousUrl };
  }

  if (selection.remove) {
    return { url: null, discardedUrl: selection.previousUrl };
  }

  return { url: selection.previousUrl, discardedUrl: null };
}
