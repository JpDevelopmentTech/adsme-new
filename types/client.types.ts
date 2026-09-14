import type {
  ClientListing,
  ClientPlatformShare,
} from "@/domain/entities/client-listing";
import type { ClientListQuery } from "@/domain/entities/client-query";

export interface ClientCardProps {
  client: ClientListing;
  /** Mes al que se refiere la inversión, ya formateado ("Agosto"). */
  monthName: string;
  /** Momento de referencia en ISO, para que los tiempos relativos no varíen. */
  nowIso: string;
}

export interface ClientCardSpendProps {
  monthInvestment: number;
  monthName: string;
  jobsCount: number;
  activeJobsCount: number;
}

export interface ClientCardPlatformMixProps {
  shares: ClientPlatformShare[];
}

export interface ClientsGridProps {
  clients: ClientListing[];
  monthName: string;
  nowIso: string;
}

export interface ClientsToolbarProps {
  query: ClientListQuery;
}
