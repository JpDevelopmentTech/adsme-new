import { ShieldCheck } from "lucide-react";
import { AUTH_SHOWCASE_COPY } from "@/constants/auth-copy.constants";
import { EqualizerBars } from "@/presentation/components/auth/equalizer-bars";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";

/** Columna izquierda del login: marca, propuesta de valor y sello de seguridad. */
export function AuthShowcasePanel() {
  return (
    <aside className="hidden min-w-0 flex-1 flex-col justify-between self-stretch py-4 lg:flex">
      <div>
        <BrandWordmark className="h-[34px]" />
      </div>

      <div className="flex flex-col gap-[22px]">
        <h1 className="max-w-[620px] text-[60px] leading-[1.08] font-extralight tracking-[-0.037em] text-text-primary">
          {AUTH_SHOWCASE_COPY.headline}
        </h1>
        <p className="max-w-[540px] text-lg leading-[1.55] text-text-secondary">
          {AUTH_SHOWCASE_COPY.subheadline}
        </p>
        <div className="pt-6">
          <EqualizerBars />
        </div>
      </div>

      <p className="flex items-center gap-2.5 text-[13px] font-normal text-text-secondary">
        <ShieldCheck size={16} strokeWidth={1.75} aria-hidden />
        {AUTH_SHOWCASE_COPY.footnote}
      </p>
    </aside>
  );
}
