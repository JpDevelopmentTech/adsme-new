import type { ClientAvatarGradient } from "@/domain/entities/client";

/**
 * Paleta de gradientes de avatar. Cada entrada mezcla un tono del sistema con
 * el indigo profundo: así todas quedan lo bastante oscuras para que las
 * iniciales en claro pasen contraste, sea cual sea el cliente que toque.
 */
const AVATAR_GRADIENTS: ClientAvatarGradient[] = [
  { from: "#414861", to: "#2b2d42" },
  { from: "#0866ff", to: "#2b2d42" },
  { from: "#0b8c99", to: "#2b2d42" },
  { from: "#d90429", to: "#2b2d42" },
  { from: "#5a6580", to: "#2b2d42" },
  { from: "#2b2d42", to: "#0866ff" },
  { from: "#ef233c", to: "#d90429" },
  { from: "#0b8c99", to: "#0866ff" },
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
