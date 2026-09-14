import type { ReactNode } from "react";
import type { Client } from "@/domain/entities/client";
import type { ClientDetail } from "@/domain/entities/client-detail";
import type { Job } from "@/domain/entities/job";

export interface ClientHeroProps {
  client: ClientDetail;
}

export interface ClientContactListProps {
  client: Client;
}

export interface ClientContactItemProps {
  icon: ReactNode;
  value: string;
}

export interface ClientMetricsProps {
  metrics: ClientDetail["metrics"];
}

export interface ClientMetricCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export interface ClientJobsPanelProps {
  jobs: Job[];
}

export interface ClientBreadcrumbProps {
  clientName: string;
}
