/**
 * Deriva las iniciales mostradas en el avatar a partir del nombre y, como respaldo,
 * del correo. Devuelve como máximo dos caracteres en mayúscula.
 */
export function getInitials(name: string | null, email: string): string {
  const source = name?.trim() || email.split("@")[0]?.replace(/[._-]+/g, " ") || "";
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";

  const initials = words.slice(0, 2).map((word) => word[0]);
  return initials.join("").toUpperCase();
}
