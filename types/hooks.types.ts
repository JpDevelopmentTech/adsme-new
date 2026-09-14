export interface UseCopyToClipboard {
  /** Copia el texto al portapapeles; ignora el fallo si el navegador lo bloquea. */
  copy: (text: string) => Promise<void>;
  /** `true` durante la ventana de confirmación posterior a una copia correcta. */
  hasCopied: boolean;
}
