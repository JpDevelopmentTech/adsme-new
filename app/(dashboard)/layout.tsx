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
 * Shell del panel: una ventana de vidrio que flota sobre el fondo violeta, con
 * el menú lateral a la izquierda y el contenido desplazable dentro. Verifica la
 * sesión en el servidor además del chequeo optimista del proxy.
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
    <div className="flex h-dvh overflow-hidden lg:p-5">
      <div className="glass-window flex min-w-0 flex-1 overflow-hidden lg:rounded-window">
        <AppSidebar user={summary} />

        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-7 px-4 pt-6 pb-8 sm:px-8 sm:pt-7">
            <AppTopbar />

            <main className="relative isolate flex flex-1 flex-col gap-7">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
