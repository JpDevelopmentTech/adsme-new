import QRCode from "qrcode";
import { QR_ELEMENT_ID } from "@/constants/report-config.constants";
import type { ReportQrProps } from "@/types/job-wizard.types";

/**
 * QR del enlace del reporte. Se genera como SVG en el servidor: no añade
 * JavaScript al cliente y es un QR real, no una maqueta que no escanea.
 */
export async function ReportQr({ url }: ReportQrProps) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    color: { dark: "#1A1A1A", light: "#FFFFFF" },
  });

  return (
    <div
      id={QR_ELEMENT_ID}
      className="size-[148px] shrink-0 overflow-hidden rounded-[18px] bg-white p-3.5 [&>svg]:size-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
