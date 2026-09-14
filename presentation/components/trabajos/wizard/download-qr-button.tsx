"use client";

import { QrCode } from "lucide-react";
import { STEP_FOUR_COPY } from "@/constants/report-config.constants";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { DownloadQrButtonProps } from "@/types/job-wizard.types";
import { downloadSvgAsPng } from "@/utils/download-svg-as-png";

/**
 * Descarga el QR como PNG. Se convierte en el navegador a partir del SVG que ya
 * está en la página: no hace falta pedirle al servidor una segunda imagen.
 */
export function DownloadQrButton({ fileName }: DownloadQrButtonProps) {
  return (
    <SecondaryButton
      type="button"
      onClick={() => downloadSvgAsPng(fileName)}
      icon={<QrCode size={18} className="text-brand-magenta" aria-hidden />}
    >
      {STEP_FOUR_COPY.downloadQr}
    </SecondaryButton>
  );
}
