import {
  EQUALIZER_BAR_HEIGHTS,
  EQUALIZER_MAX_HEIGHT_PX,
  EQUALIZER_MIN_OPACITY,
  EQUALIZER_STAGGER_MS,
} from "@/constants/equalizer.constants";

/** Ecualizador decorativo del login: 20 barras de blanco a lila que laten en cascada. */
export function EqualizerBars() {
  return (
    <div aria-hidden className="flex h-[126px] w-full max-w-[620px] items-end gap-[11px]">
      {EQUALIZER_BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="animate-equalizer flex-1 rounded-t-[6px] rounded-b-[2px] bg-gradient-to-b from-white to-lilac/20"
          style={{
            height,
            opacity:
              EQUALIZER_MIN_OPACITY +
              (1 - EQUALIZER_MIN_OPACITY) * (height / EQUALIZER_MAX_HEIGHT_PX),
            animationDelay: `${index * EQUALIZER_STAGGER_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
