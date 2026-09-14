import QRCode from "qrcode";
import {
  QR_ELEMENT_ID,
  STEP_FOUR_COPY,
} from "@/constants/report-config.constants";
import type { ReportQrProps } from "@/types/job-wizard.types";

/**
 * QR del enlace del reporte. Se genera como SVG en el servidor: no añade
 * JavaScript al cliente y es un QR real, no una maqueta que no escanea.
 */
export async function ReportQr({ url }: ReportQrProps) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    color: { dark: "#0A0A0F", light: "#FFFFFF" },
  });

  return (
    <aside className="flex flex-col items-center justify-center gap-4 rounded-md border border-border bg-card-elevated p-6 xl:w-[300px] xl:shrink-0">
      <div
        id={QR_ELEMENT_ID}
        className="size-[200px] overflow-hidden rounded-md bg-white p-4 [&>svg]:size-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[13px] font-semibold text-text-primary">
          {STEP_FOUR_COPY.scan}
        </p>
        <p className="text-xs break-all text-text-muted">
          {url.replace(/^https?:\/\//, "")}
        </p>
      </div>
    </aside>
  );
}
