import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;

/**
 * Clave de cifrado de los tokens de plataforma. Vive solo en el servidor y
 * nunca se envía a la base de datos: allí únicamente se guarda el texto cifrado.
 */
function getKey(): Buffer {
  const raw = process.env.PLATFORM_TOKEN_KEY;

  if (!raw) throw new Error("Falta PLATFORM_TOKEN_KEY.");

  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("PLATFORM_TOKEN_KEY debe ser de 32 bytes en base64.");
  }

  return key;
}

/** Cifra un token con AES-256-GCM. Formato: `iv.tag.ciphertext` en base64url. */
export function encryptToken(plainText: string): string {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  return [iv, cipher.getAuthTag(), encrypted]
    .map((part) => part.toString("base64url"))
    .join(".");
}

/**
 * Descifra un token. Devuelve `null` si el texto viene alterado: GCM detecta
 * cualquier manipulación al verificar la etiqueta de autenticación.
 */
export function decryptToken(payload: string): string | null {
  try {
    const [iv, tag, encrypted] = payload
      .split(".")
      .map((part) => Buffer.from(part, "base64url"));

    if (!iv || !tag || !encrypted) return null;

    const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
    decipher.setAuthTag(tag);

    return Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return null;
  }
}
