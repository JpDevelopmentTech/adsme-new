/**
 * Resultado de sincronizar una plataforma.
 *
 * Existe para que el sync no se cuente redirigiendo: cuando hay varias cuentas
 * conectadas, la redirección de la primera cortaría el resto —en Next viaja
 * como excepción—, así que cada plataforma devuelve lo suyo y quien las
 * orquesta decide qué enseñar al final.
 */
export type SyncOutcome = { ok: true } | { ok: false; message: string };

/** Fallo con el motivo ya redactado para el usuario. */
export function syncFailed(message: string): SyncOutcome {
  return { ok: false, message };
}
