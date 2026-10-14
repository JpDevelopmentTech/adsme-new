import type { NominaSocialUrlCheck } from "@/types/nomina-modales.types";

/**
 * Revisa el enlace de una red: acepta «instagram.com/usuario» sin `https://`;
 * es inválido si no parece una URL web y ajeno si el dominio no es de la red.
 */
export function checkSocialUrl(value: string, domains: string[]): NominaSocialUrlCheck {
  const trimmed = value.trim();
  if (!trimmed) return "ok";

  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (!url.hostname.includes(".") || /\s/.test(trimmed)) return "invalid";
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return domains.some((domain) => host === domain || host.endsWith(`.${domain}`)) ? "ok" : "foreign";
  } catch {
    return "invalid";
  }
}
