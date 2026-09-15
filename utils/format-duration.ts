import { daysBetween } from "@/utils/month-range";

/** Días que cubre un período ISO, en palabras («30 días»). */
export function formatDuration(startsOn: string, endsOn: string): string | null {
  if (!startsOn || !endsOn || endsOn < startsOn) return null;

  const days = daysBetween(startsOn, endsOn);

  return `${days} ${days === 1 ? "día" : "días"}`;
}
