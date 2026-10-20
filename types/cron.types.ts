/** Resultado de sincronizar todas las cuentas de un propietario en el cron. */
export interface OwnerSyncResult {
  ownerId: string;
  ok: boolean;
  /** Motivos ya redactados de lo que falló; vacío si todo fue bien. */
  errors: string[];
}

/** Lo que devuelve el cron diario, y lo que queda en el registro de Vercel. */
export interface DailySyncSummary {
  startedAt: string;
  finishedAt: string;
  /** Aviso si no se pudo refrescar la TRM; `null` si se refrescó. */
  rateWarning: string | null;
  owners: OwnerSyncResult[];
}
