import {
  EQUALIZER_BAR_HEIGHTS,
  EQUALIZER_BAR_OPACITIES,
  EQUALIZER_BAR_WIDTH_PX,
} from "@/constants/equalizer.constants";

export function EqualizerBars() {
  return (
    <div
      aria-hidden
      className="flex h-[88px] items-end gap-[5px]"
    >
      {EQUALIZER_BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="animate-equalizer rounded-[4px] bg-gradient-to-t from-brand-violet to-brand-magenta"
          style={{
            width: EQUALIZER_BAR_WIDTH_PX,
            height,
            opacity: EQUALIZER_BAR_OPACITIES[index % EQUALIZER_BAR_OPACITIES.length],
            animationDelay: `${index * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}
