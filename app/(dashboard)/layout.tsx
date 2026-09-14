import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { AppSidebar } from "@/presentation/components/dashboard/app-sidebar";
import { AppTopbar } from "@/presentation/components/dashboard/app-topbar";
import { toCurrentUserSummary } from "@/utils/to-current-user-summary";

/**
 * Shell del panel: sidebar fijo, topbar y área de contenido con scroll propio.
 * Verifica la sesión en el servidor además del chequeo optimista del proxy.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const repository = createSupabaseAuthRepository(
    await createServerSupabaseClient(),
  );
  const user = await createGetCurrentUser(repository)();

  if (!user) redirect(LOGIN_ROUTE);

  const summary = toCurrentUserSummary(user);

  return (
    <div className="flex h-dvh overflow-hidden">
      <AppSidebar user={summary} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={summary} />
        <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
