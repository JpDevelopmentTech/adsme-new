import type { SupabaseClient } from "@supabase/supabase-js";
import { PUBLIC_OBJECT_URL_SEGMENT } from "@/constants/storage.constants";

/** Extensión del objeto según el tipo declarado por el navegador. */
const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

/**
 * Sube la imagen a la carpeta del usuario dentro del bucket y devuelve su URL
 * pública. Lanza si Storage la rechaza (tipo o tamaño fuera de lo permitido).
 */
export async function uploadToBucket(
  supabase: SupabaseClient,
  bucket: string,
  ownerId: string,
  file: File,
): Promise<string> {
  const extension = EXTENSION_BY_TYPE[file.type] ?? "jpg";
  const path = `${ownerId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw error;

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

/**
 * Borra del bucket el objeto apuntado por una URL pública.
 * Los fallos se ignoran: un objeto huérfano no debe romper el guardado.
 */
export async function removeFromBucket(
  supabase: SupabaseClient,
  bucket: string,
  publicUrl: string | null,
): Promise<void> {
  const path = toObjectPath(bucket, publicUrl);
  if (!path) return;

  await supabase.storage.from(bucket).remove([path]);
}

/** Extrae la ruta del objeto dentro del bucket a partir de su URL pública. */
function toObjectPath(bucket: string, publicUrl: string | null): string | null {
  if (!publicUrl) return null;

  const marker = `${PUBLIC_OBJECT_URL_SEGMENT}${bucket}/`;
  const index = publicUrl.indexOf(marker);

  return index === -1 ? null : publicUrl.slice(index + marker.length);
}
