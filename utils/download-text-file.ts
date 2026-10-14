/**
 * Descarga un texto como archivo desde el navegador. Antepone la marca BOM para
 * que Excel abra el CSV en UTF-8 y respete las tildes.
 */
export function downloadTextFile(content: string, fileName: string, mimeType: string): void {
  const url = URL.createObjectURL(new Blob(["﻿", content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
