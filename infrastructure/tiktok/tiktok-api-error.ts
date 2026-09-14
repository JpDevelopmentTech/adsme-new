/**
 * Fallo al hablar con la Marketing API. Lleva el motivo que devuelve TikTok
 * para que la pantalla pueda explicarlo en vez de decir solo que no se pudo
 * importar.
 */
export class TiktokApiError extends Error {
  /** Código de la respuesta de TikTok; `0` es éxito y cualquier otro un fallo. */
  readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "TiktokApiError";
    this.code = code;
  }

  /**
   * El acceso dejó de servir y hay que volver a autorizar. TikTok agrupa aquí
   * el token caducado, el revocado y el que perdió permisos sobre la cuenta.
   */
  get needsReauthorization(): boolean {
    return TIKTOK_AUTH_ERROR_CODES.has(this.code);
  }
}

/** Códigos con los que TikTok señala que el token ya no vale. */
const TIKTOK_AUTH_ERROR_CODES = new Set([40001, 40100, 40101, 40102, 40105]);
