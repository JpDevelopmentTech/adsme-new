import { QR_DOWNLOAD_SIZE, QR_ELEMENT_ID } from "@/constants/report-config.constants";

/**
 * Convierte el QR de la página en un PNG y lo descarga. Se dibuja sobre fondo
 * blanco y a tamaño grande: un QR con fondo transparente o pequeño falla al
 * imprimirlo o al escanearlo desde una pantalla.
 */
export function downloadSvgAsPng(fileName: string): void {
  const svg = document.getElementById(QR_ELEMENT_ID)?.querySelector("svg");

  if (!svg) return;

  const source = new XMLSerializer().serializeToString(svg);
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = QR_DOWNLOAD_SIZE;
    canvas.height = QR_DOWNLOAD_SIZE;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, QR_DOWNLOAD_SIZE, QR_DOWNLOAD_SIZE);
    context.drawImage(image, 0, 0, QR_DOWNLOAD_SIZE, QR_DOWNLOAD_SIZE);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${fileName}.png`;
    link.click();
  };

  image.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(source)))}`;
}
