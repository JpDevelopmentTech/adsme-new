/** Cliente que todavía no está en Nómina y se puede inscribir. */
export interface NominaEligibleClient {
  id: string;
  name: string;
  handle: string;
  kind: string;
  avatarUrl: string | null;
}
