import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import type { ReportLinkStateProps } from "@/types/report.types";

/**
 * Pantalla de un enlace que ya no abre el reporte —caducado o no válido—: una
 * tarjeta de vidrio con la marca, qué pasó y qué hacer. Explica el problema en
 * la voz del producto y manda a quien gestiona las campañas por uno nuevo.
 */
export function ReportLinkState({ icon: Icon, title, body, code }: ReportLinkStateProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4 sm:p-10">
      <section className="glass-float flex w-full max-w-[560px] flex-col items-center gap-[22px] rounded-[36px] px-8 py-12 text-center sm:px-12 sm:py-14">
        <BrandWordmark className="h-6 opacity-80" />

        <span aria-hidden className="grid size-[110px] place-items-center rounded-pill bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-magenta)_40%,transparent)_0%,transparent_70%)]">
          <span className="grid size-[68px] place-items-center rounded-[22px] border border-white/20 bg-surface">
            <Icon size={28} strokeWidth={1.5} className="text-text-primary" />
          </span>
        </span>

        <h1 className="text-[34px] leading-tight font-extralight text-text-primary">{title}</h1>
        <p className="max-w-[440px] text-[15px] leading-[1.6] font-light text-text-secondary">{body}</p>

        {code ? (
          <p className="rounded-pill border border-border bg-surface px-3.5 py-1.5 text-xs text-text-muted">{code}</p>
        ) : null}
      </section>
    </main>
  );
}
