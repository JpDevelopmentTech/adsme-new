import type { ClientAvatarGradient } from "@/domain/entities/client";

/**
 * Paleta de gradientes de avatar. Cada entrada mezcla un tono del sistema con
 * la tinta: así todas quedan lo bastante oscuras para que las
 * iniciales en claro pasen contraste, sea cual sea el cliente que toque.
 */
const AVATAR_GRADIENTS: ClientAvatarGradient[] = [
  { from: "#4e5b56", to: "#1f2a27" },
  { from: "#4a6fa5", to: "#1f2a27" },
  { from: "#2e8c87", to: "#1f2a27" },
  { from: "#c4553f", to: "#1f2a27" },
  { from: "#5e6a65", to: "#1f2a27" },
  { from: "#6e8f80", to: "#1f2a27" },
  { from: "#5b7c8d", to: "#1f2a27" },
  { from: "#7d8f5e", to: "#1f2a27" },
];

/**
 * Asigna un gradiente estable a partir del identificador, para que el avatar de
 * un cliente no cambie de color entre renders ni entre sesiones.
 */
export function resolveClientGradient(clientId: string): ClientAvatarGradient {
  let hash = 0;
  for (let index = 0; index < clientId.length; index += 1) {
    hash = (hash * 31 + clientId.charCodeAt(index)) % 100_000;
  }

  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}
