import { CONNECTIONS_SUMMARY_COPY } from "@/constants/connections.constants";
import type { Countdown } from "@/types/connections.types";

const HOUR_IN_MINUTES = 60;

/**
 * Cuenta atrás legible para el reloj: minutos en la última hora y horas
 * enteras antes. Con un ciclo diario, «846 min» no se lee de un vistazo.
 */
export function formatCountdown(minutesLeft: number): Countdown {
  if (minutesLeft < HOUR_IN_MINUTES) {
    return { value: String(minutesLeft), unit: CONNECTIONS_SUMMARY_COPY.minutes };
  }

  return {
    value: String(Math.floor(minutesLeft / HOUR_IN_MINUTES)),
    unit: CONNECTIONS_SUMMARY_COPY.hours,
  };
}
