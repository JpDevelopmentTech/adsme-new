import type { Campaign } from "@/domain/entities/campaign";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { Job } from "@/domain/entities/job";
import type { JobMetrics } from "@/utils/build-job-metrics";

export interface JobHeroProps {
  job: Job;
  clientName: string;
  /** Instante de render en ISO, para calcular «hace X» sin desajustes. */
  now: string;
}

export interface CopyLinkButtonProps {
  url: string | null;
}

export interface JobKpisProps {
  metrics: JobMetrics;
}

export interface JobPlatformCardProps {
  platform: ConnectionPlatform;
  campaigns: Campaign[];
  now: string;
}
