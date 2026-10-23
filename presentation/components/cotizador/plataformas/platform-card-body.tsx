"use client";

import { PautaLines } from "@/presentation/components/cotizador/plataformas/pauta-lines";
import { PlatformBudgetField } from "@/presentation/components/cotizador/plataformas/platform-budget-field";
import { PlatformCascade } from "@/presentation/components/cotizador/plataformas/platform-cascade";
import { PlatformFeeBlock } from "@/presentation/components/cotizador/plataformas/platform-fee-block";
import { PlatformNotesField } from "@/presentation/components/cotizador/plataformas/platform-notes-field";
import { PlatformServiceBlock } from "@/presentation/components/cotizador/plataformas/platform-service-block";
import type { PlatformBodyProps } from "@/types/quote-platforms.types";

/** Cuerpo de la tarjeta, en el orden en que se piensa: presupuesto, cascada, pauta, comisión y servicio, notas. */
export function PlatformCardBody({ id, platform, figures }: PlatformBodyProps) {
  return (
    <div id={id} className="flex flex-col gap-5">
      <PlatformBudgetField platform={platform} figures={figures} />
      <PlatformCascade platform={platform} figures={figures} />
      <PautaLines platform={platform} figures={figures} />
      <div className="grid gap-3 md:grid-cols-2">
        <PlatformFeeBlock platform={platform} figures={figures} />
        <PlatformServiceBlock platform={platform} figures={figures} />
      </div>
      <PlatformNotesField platform={platform} />
    </div>
  );
}
