/** Palabras sin tildes ni ambigüedades, fáciles de dictar por teléfono. */
const WORDS = [
  "neon", "disco", "vinilo", "sonido", "tempo", "acorde", "ritmo", "coro",
  "bajo", "sintes", "mezcla", "estudio", "gira", "single", "remix", "banda",
];

/**
 * Clave legible para compartir con el artista. Dos palabras y tres cifras se
 * dictan sin errores, a diferencia de una cadena aleatoria.
 */
export function buildPassphrase(): string {
  const pick = () => WORDS[Math.floor(Math.random() * WORDS.length)];
  const digits = String(Math.floor(Math.random() * 900) + 100);

  return `${pick()}-${pick()}-${digits}`;
}
