/** Condiciones de acceso de un enlace de reporte. */
export interface ReportLinkProtection {
  /** Clave en claro para cifrarla en la base de datos; `null` la retira. */
  password: string | null;
  /** Momento de caducidad en ISO; `null` deja el enlace sin fecha de fin. */
  expiresAt: string | null;
}
