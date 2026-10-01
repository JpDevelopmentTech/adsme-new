import { NextResponse, type NextRequest } from "next/server";
import { GLOBAL_SEARCH_LIMIT } from "@/constants/global-search.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSearchEverything } from "@/domain/use-cases/search-everything";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { globalSearchQuerySchema } from "@/validators/global-search.validators";

export const dynamic = "force-dynamic";

/**
 * Buscador global del panel: devuelve clientes, trabajos y campañas del usuario
 * que coinciden con `q`. Exige sesión además del chequeo del proxy, y RLS
 * garantiza que solo se lean filas propias.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const parsed = globalSearchQuerySchema.safeParse({
    q: request.nextUrl.searchParams.get("q") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Término de búsqueda no válido." }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const results = await createSearchEverything(
    createSupabaseClientRepository(supabase),
    createSupabaseJobRepository(supabase),
    createSupabaseCampaignRepository(supabase),
  )(parsed.data.q, GLOBAL_SEARCH_LIMIT);

  return NextResponse.json(results, { headers: { "Cache-Control": "no-store" } });
}
