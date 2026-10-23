import type { Dispatch, ReactNode } from "react";
import type { QuoteCurrency, QuoteDraft, QuoteSectionsUi } from "@/domain/entities/quote";
import type { QuotePlatformPreset, QuoteReference, QuoteSavedClient } from "@/domain/entities/quote-catalog";
import type { QuoteShareSnapshot } from "@/domain/use-cases/quote/quote-grand-total";
import type { QuotePlatformField } from "@/domain/use-cases/quote/quote-platform-fields";

/** Campos de texto o elección simple de la cotización. */
export type QuoteSimpleField = Pick<QuoteDraft, "artist" | "project" | "sex" | "ageFrom" | "ageTo" | "notes" | "terms" | "includePayments" | "campaignCollapsed" | "entity">;

/** Acciones del cotizador. Los importes llegan en la moneda de la vista. */
export type QuoteAction =
  | { type: "replace"; draft: QuoteDraft }
  | { type: "new" }
  | { type: "set"; patch: Partial<QuoteSimpleField> }
  | { type: "toggleSection"; section: keyof QuoteSectionsUi }
  | { type: "toggleGenre"; name: string }
  | { type: "addGenre"; name: string }
  | { type: "toggleInterest"; name: string }
  | { type: "addTarget" }
  | { type: "removeTarget"; targetId: string }
  | { type: "setTargetPct"; targetId: string; pct: number | null }
  | { type: "addTargetPlace"; targetId: string; code: string }
  | { type: "removeTargetPlace"; targetId: string; code: string }
  | { type: "addTargetZone"; targetId: string; zone: string; composition?: string }
  | { type: "removeTargetZone"; targetId: string; zone: string }
  | { type: "setSettings"; fee?: number; serviceCop?: number; serviceUsd?: number }
  | { type: "setTrm"; value: number; isManual: boolean }
  | { type: "setCurrency"; currency: QuoteCurrency }
  | { type: "addPlatform"; preset: QuotePlatformPreset }
  | { type: "removePlatform"; platformId: string }
  | { type: "renamePlatform"; platformId: string; name: string }
  | { type: "setPlatformNotes"; platformId: string; notes: string }
  | { type: "togglePlatformCollapsed"; platformId: string }
  | { type: "collapseAllPlatforms"; collapsed: boolean }
  | { type: "togglePlatformLock"; platformId: string }
  | { type: "setPlatformField"; platformId: string; field: QuotePlatformField; value: number }
  | { type: "setPlatformShare"; platformId: string; pct: number }
  | { type: "setServiceOn"; platformId: string; isOn: boolean }
  | { type: "stepMonths"; platformId: string; delta: 1 | -1 }
  | { type: "addLine"; platformId: string }
  | { type: "removeLine"; platformId: string; lineId: string }
  | { type: "setLineLabel"; platformId: string; lineId: string; label: string }
  | { type: "setLineAmount"; platformId: string; lineId: string; value: number }
  | { type: "setLinePct"; platformId: string; lineId: string; pct: number }
  | { type: "toggleLineLock"; platformId: string; lineId: string }
  | { type: "setGrand"; value: number }
  | { type: "releaseGrand" }
  | { type: "takeSnapshot" }
  | { type: "clearSnapshot" }
  | { type: "saveClient"; totalText: string; isSilent: boolean }
  | { type: "loadClient"; slug: string }
  | { type: "toast"; message: string }
  | { type: "dismissToast" };

/** Cliente guardado; en esta sesión también conserva su cotización para cargarla. */
export interface QuoteStoredClient extends QuoteSavedClient {
  draft: QuoteDraft | null;
}

export interface QuoteToast {
  id: number;
  message: string;
}

export interface QuoteState {
  draft: QuoteDraft;
  /** Pesos de cada plataforma al empezar a editar un total. */
  snapshot: QuoteShareSnapshot;
  toast: QuoteToast | null;
  clients: QuoteStoredClient[];
}

export interface QuoteContextValue {
  state: QuoteState;
  dispatch: Dispatch<QuoteAction>;
  reference: QuoteReference;
}

export interface QuoteProviderProps {
  reference: QuoteReference;
  children: ReactNode;
}
