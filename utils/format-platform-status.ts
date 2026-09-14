import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { PlatformShare } from "@/domain/entities/dashboard";

interface PlatformStatus {
  label: string;
  /** El estado se lee como aviso cuando hay algo que reautorizar o conectar. */
  isWarning: boolean;
}

/** Estado de la conexión que alimenta la plataforma, en una línea. */
export function formatPlatformStatus(share: PlatformShare): PlatformStatus {
  if (!share.connected) {
    return { label: DASHBOARD_COPY.notConnected, isWarning: true };
  }

  if (share.tokenExpiresInDays !== null) {
    const days = share.tokenExpiresInDays;

    return {
      label:
        days === 0
          ? DASHBOARD_COPY.expiredToken
          : `Token expira en ${days} ${days === 1 ? "día" : "días"}`,
      isWarning: true,
    };
  }

  return {
    label: `Conectado · ${share.activeJobs} ${share.activeJobs === 1 ? "trabajo" : "trabajos"}`,
    isWarning: false,
  };
}
