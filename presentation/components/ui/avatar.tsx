import type { AvatarProps } from "@/types/dashboard.types";
import { cn } from "@/utils/cn";

export function Avatar({
  initials,
  size,
  fontSize = 12,
  shape = "circle",
  gradient,
  imageUrl,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden font-display font-normal tracking-[0.4px] text-g-50",
        shape === "circle" ? "rounded-pill" : "rounded-md",
        !gradient && "bg-g-700",
      )}
      style={{
        width: size,
        height: size,
        fontSize,
        ...(gradient
          ? {
              backgroundImage: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            }
          : {}),
      }}
    >
      {imageUrl ? (
        // Blob local del uploader o URL remota: `next/image` no aporta aquí.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="size-full object-cover"
          width={size}
          height={size}
        />
      ) : (
        initials
      )}
    </span>
  );
}
