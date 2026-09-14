import {
  CONNECTION_OF_PLATFORM,
  PLATFORM_LABELS,
  PLATFORM_ORDER,
} from "@/constants/platform-labels.constants";
import {
  CONNECTIONS_ROUTE,
  editJobRoute,
  jobLinkRoute,
} from "@/constants/routes.constants";
import type { Connection } from "@/domain/entities/connection";
import type { DashboardAlert } from "@/domain/entities/dashboard";
import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";
import { dayOfMonth } from "@/utils/month-range";
import { tokenDaysLeft } from "@/utils/token-days-left";

const MAX_ALERTS = 5;

/** Trabajos en curso cuyo período ya terminó. */
function overdueAlerts(active: JobListing[], today: string): DashboardAlert[] {
  return active
    .filter((job) => job.endsOn < today)
    .map((job) => ({
      id: `overdue-${job.id}`,
      kind: "overdue" as const,
      title: job.title,
      detail: "El período terminó y sigue activo",
      href: editJobRoute(job.id),
    }));
}

/** Trabajos en curso sin ninguna plataforma vinculada. */
function withoutPlatformAlerts(active: JobListing[]): DashboardAlert[] {
  return active
    .filter((job) => job.platforms.length === 0)
    .map((job) => ({
      id: `no-platforms-${job.id}`,
      kind: "no-platforms" as const,
      title: job.title,
      detail: "Sin campañas vinculadas",
      href: editJobRoute(job.id),
    }));
}

/** Trabajos en curso cuyo reporte todavía no se puede compartir. */
function withoutReportAlerts(active: JobListing[]): DashboardAlert[] {
  return active
    .filter((job) => job.reportUrl === null)
    .map((job) => ({
      id: `no-report-link-${job.id}`,
      kind: "no-report-link" as const,
      title: job.title,
      detail: "Reporte sin enlace compartido",
      href: jobLinkRoute(job.id),
    }));
}

/** Plataformas en uso cuya conexión falta o está a punto de caducar. */
function connectionAlerts(
  inUse: Set<JobPlatform>,
  connections: Connection[],
  now: Date,
): DashboardAlert[] {
  return PLATFORM_ORDER.filter((platform) => inUse.has(platform)).flatMap(
    (platform): DashboardAlert[] => {
      const connection = connections.find(
        (item) => item.platform === CONNECTION_OF_PLATFORM[platform],
      );
      const daysLeft = tokenDaysLeft(connection, now);
      const label = PLATFORM_LABELS[platform];

      if (connection?.status !== "conectado") {
        return [
          {
            id: `disconnected-${platform}`,
            kind: "disconnected" as const,
            title: label,
            detail: "Hay trabajos pautando sin conexión activa",
            href: CONNECTIONS_ROUTE,
          },
        ];
      }

      if (daysLeft === null) return [];

      return [
        {
          id: `token-expiring-${platform}`,
          kind: "token-expiring" as const,
          title: label,
          detail:
            daysLeft === 0
              ? "El token caducó y no se importan datos"
              : `El token expira en ${daysLeft} ${daysLeft === 1 ? "día" : "días"}`,
          href: CONNECTIONS_ROUTE,
        },
      ];
    },
  );
}

/** Reúne, en orden de urgencia, todo lo que el usuario debería resolver hoy. */
export function buildDashboardAlerts(
  jobs: JobListing[],
  connections: Connection[],
  now: Date,
): DashboardAlert[] {
  const active = jobs.filter((job) => job.status === "active");
  const today = dayOfMonth(now, now.getDate());
  const inUse = new Set(active.flatMap((job) => job.platforms));

  // Las conexiones van antes que los trabajos: una cuenta caída bloquea todos
  // los datos, mientras que un trabajo sin pauta solo se afecta a sí mismo.
  return [
    ...overdueAlerts(active, today),
    ...connectionAlerts(inUse, connections, now),
    ...withoutPlatformAlerts(active),
    ...withoutReportAlerts(active),
  ].slice(0, MAX_ALERTS);
}
