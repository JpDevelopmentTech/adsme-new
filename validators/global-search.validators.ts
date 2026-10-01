import { z } from "zod";
import {
  GLOBAL_SEARCH_MAX_CHARS,
  GLOBAL_SEARCH_MIN_CHARS,
} from "@/constants/global-search.constants";

/** Parámetros de `GET /api/search`: el término, recortado y con longitud acotada. */
export const globalSearchQuerySchema = z.object({
  q: z.string().trim().min(GLOBAL_SEARCH_MIN_CHARS).max(GLOBAL_SEARCH_MAX_CHARS),
});
