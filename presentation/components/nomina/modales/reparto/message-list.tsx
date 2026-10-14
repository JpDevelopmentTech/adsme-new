import type { MessageListProps } from "@/types/nomina-modales-reparto.types";

/** Lista de mensajes de la viabilidad con su prefijo («✕ », «⚠ », «✓ »). */
export function MessageList({ items, prefix, className }: MessageListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-col gap-1.5 text-[13px] leading-[1.45] font-light ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden>{prefix}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
