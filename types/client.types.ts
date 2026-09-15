import type {
  ClientListing,
  ClientPlatformShare,
} from "@/domain/entities/client-listing";
import type { ClientListQuery } from "@/domain/entities/client-query";

/** Cifras de la banda que encabeza el listado de clientes. */
export interface PortfolioSummary {
  /** Inversión sumada del mes en los clientes mostrados. */
  total: number;
  clientsCount: number;
  working: number;
  paused: number;
  empty: number;
  liveCampaigns: number;
}

export interface ClientsPortfolioBandProps {
  summary: PortfolioSummary;
  clients: ClientListing[];
  /** Mes al que se refiere la inversión, ya formateado ("Septiembre"). */
  monthName: string;
}

export interface ClientAvatarStackProps {
  clients: ClientListing[];
}

export interface ClientSpendBarProps {
  shares: ClientPlatformShare[];
  monthInvestment: number;
  /** Inversión del cliente que más invierte; fija la escala común del listado. */
  maxInvestment: number;
}

export interface ClientRowProps {
  client: ClientListing;
  maxInvestment: number;
  /** Momento de referencia en ISO, para que los tiempos relativos no varíen. */
  nowIso: string;
}

export interface ClientsTableProps {
  clients: ClientListing[];
  maxInvestment: number;
  nowIso: string;
  query: ClientListQuery;
  /** Con filtros puestos el recuento habla de resultados, no de la cartera. */
  isFiltered: boolean;
}

export interface ClientsToolbarProps {
  query: ClientListQuery;
  /** Recuento que se muestra a la derecha de los filtros. */
  resultsLabel: string;
}
