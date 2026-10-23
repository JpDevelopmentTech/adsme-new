import type { QuoteDraft } from "@/domain/entities/quote";
import { createQuoteTarget } from "@/domain/use-cases/quote/create-quote-draft";
import type { QuoteAction } from "@/types/quote-store.types";

const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

/** Línea «Zona: composición» que una zona agrupada deja en la descripción. */
const zoneNote = (zone: string, composition: string) => `${zone}: ${composition}`;

/** Quita la línea de una zona agrupada si ya ningún segmento la usa. */
function dropZoneNote(draft: QuoteDraft, zone: string): void {
  if (draft.targets.some((target) => target.zones.includes(zone))) return;
  draft.notes = draft.notes.split("\n").filter((line) => !line.startsWith(`${zone}: `)).join("\n");
}

/** Campaña: datos del artista, géneros, intereses y segmentos de público. Muta la copia recibida. */
export function reduceCampaign(draft: QuoteDraft, action: QuoteAction): boolean {
  const target = "targetId" in action ? draft.targets.find((item) => item.id === action.targetId) : undefined;

  switch (action.type) {
    case "set": Object.assign(draft, action.patch); return true;
    case "toggleSection": draft.sections[action.section] = !draft.sections[action.section]; return true;
    case "toggleGenre": draft.genres = toggle(draft.genres, action.name); return true;
    case "addGenre":
      if (!draft.customGenres.includes(action.name)) draft.customGenres.push(action.name);
      if (!draft.genres.includes(action.name)) draft.genres.push(action.name);
      return true;
    case "toggleInterest": draft.interests = toggle(draft.interests, action.name); return true;
    case "addTarget": draft.targets.push(createQuoteTarget(null)); return true;
    case "removeTarget": {
      const zones = target?.zones ?? [];
      draft.targets = draft.targets.filter((item) => item.id !== action.targetId);
      zones.forEach((zone) => dropZoneNote(draft, zone));
      return true;
    }
    case "setTargetPct": if (target) target.pct = action.pct; return true;
    case "addTargetPlace": if (target && !target.places.includes(action.code)) target.places.push(action.code); return true;
    case "removeTargetPlace": if (target) target.places = target.places.filter((code) => code !== action.code); return true;
    case "addTargetZone":
      if (target && !target.zones.includes(action.zone)) target.zones.push(action.zone);
      if (action.composition && !draft.notes.includes(zoneNote(action.zone, action.composition))) {
        draft.notes = [draft.notes.trimEnd(), zoneNote(action.zone, action.composition)].filter(Boolean).join("\n");
      }
      return true;
    case "removeTargetZone":
      if (target) target.zones = target.zones.filter((zone) => zone !== action.zone);
      dropZoneNote(draft, action.zone);
      return true;
    default: return false;
  }
}
