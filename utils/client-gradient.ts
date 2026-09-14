import type { ClientAvatarGradient } from "@/domain/entities/client";

/** Paleta de gradientes de avatar tomada de las tarjetas de `B2 · Clientes`. */
const AVATAR_GRADIENTS: ClientAvatarGradient[] = [
  { from: "#7C3AED", to: "#DB2777" },
  { from: "#DB2777", to: "#E11D48" },
  { from: "#0891B2", to: "#7C3AED" },
  { from: "#4D7C0F", to: "#0891B2" },
  { from: "#B45309", to: "#DB2777" },
  { from: "#7C3AED", to: "#0891B2" },
  { from: "#E11D48", to: "#7C3AED" },
  { from: "#DB2777", to: "#7C3AED" },
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
