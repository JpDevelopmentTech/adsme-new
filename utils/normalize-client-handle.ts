import { CLIENT_HANDLE_PREFIX } from "@/constants/client-form.constants";

/**
 * Deja el usuario como lo escribe la gente en redes pero sin la arroba: sin
 * espacios a los lados, sin las `@` del principio y en minúsculas. Así da igual
 * si lo escriben con arroba, sin ella o con mayúsculas.
 */
export function stripClientHandle(value: string): string {
  return value.trim().replace(/^@+/, "").toLowerCase();
}

/** Usuario listo para guardar y mostrar: siempre con su arroba delante. */
export function toClientHandle(value: string): string {
  return `${CLIENT_HANDLE_PREFIX}${stripClientHandle(value)}`;
}
