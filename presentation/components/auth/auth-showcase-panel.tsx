import { ShieldCheck } from "lucide-react";
import { AUTH_SHOWCASE_COPY } from "@/constants/auth-copy.constants";
import { EqualizerBars } from "@/presentation/components/auth/equalizer-bars";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Columna izquierda del login: marca, propuesta de valor y sello de seguridad. */
export function AuthShowcasePanel() {
  return (
    <aside className="relative hidden w-[560px] shrink-0 flex-col justify-between overflow-hidden bg-auth-aurora p-14 lg:flex">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[120px] top-[380px] size-[420px] bg-magenta-glow blur-[40px]"
      />

      <div className="relative">
        <BrandWordmark className="h-8" />
      </div>

      <div className="relative flex w-[400px] max-w-full flex-col gap-6">
        <h1 className="font-display text-[38px] leading-[1.15] font-bold text-text-primary">
          {AUTH_SHOWCASE_COPY.headline}
        </h1>
        <p className="text-base leading-[1.5] text-text-secondary">
          {AUTH_SHOWCASE_COPY.subheadline}
        </p>
        <EqualizerBars />
      </div>

      <p className="relative flex items-center gap-2.5 text-[13px] text-text-muted">
        <ShieldCheck size={18} className="text-data-cyan" aria-hidden />
        {AUTH_SHOWCASE_COPY.footnote}
      </p>
    </aside>
  );
}
