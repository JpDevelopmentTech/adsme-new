/**
 * Fallo al hablar con la Graph API. Lleva el motivo que devuelve Meta para que
 * la pantalla pueda explicarlo en vez de decir solo que no se pudo importar.
 */
export class MetaApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MetaApiError";
  }
}
