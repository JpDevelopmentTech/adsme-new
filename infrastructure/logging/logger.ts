import "server-only";

/** Datos de contexto que acompañan a una entrada del registro. */
type LogContext = Record<string, unknown>;

/**
 * Escribe una línea JSON por evento. Vercel recoge la salida estándar y la de
 * error de cada función en sus Runtime Logs, y en JSON se puede filtrar por
 * campo; no hace falta una dependencia para eso.
 */
function write(
  level: "info" | "warn" | "error",
  event: string,
  context: LogContext,
): void {
  const line = JSON.stringify({
    level,
    event,
    at: new Date().toISOString(),
    ...context,
  });

  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

/** Registro del servidor. Nunca debe recibir tokens ni secretos en el contexto. */
export const logger = {
  info: (event: string, context: LogContext = {}) => write("info", event, context),
  warn: (event: string, context: LogContext = {}) => write("warn", event, context),
  error: (event: string, context: LogContext = {}) => write("error", event, context),
};
