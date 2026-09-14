import { LogIn, RefreshCw, Unlink } from "lucide-react";
import { Suspense } from "react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { connectMetaAction } from "@/presentation/actions/connect-meta-action";
import { disconnectMetaAction } from "@/presentation/actions/disconnect-meta-action";
import { MetaAccountPicker } from "@/presentation/components/conexiones/meta-account-picker";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { MetaConnectedActionsProps } from "@/types/connections.types";

/** Botón que arranca el OAuth de Meta Ads. */
export function MetaConnectAction() {
  return (
    <form action={connectMetaAction} className="w-full">
      <PrimaryButton type="submit" className="w-full">
        <LogIn size={18} strokeWidth={2} aria-hidden />
        {CONNECTIONS_COPY.connect}
      </PrimaryButton>
    </form>
  );
}

/**
 * Acciones de la cuenta ya conectada. Reautorizar rehace el OAuth, que es la
 * única forma de renovar un token de larga duración de Meta; solo pasa a
 * primario cuando el acceso está por caducar.
 */
export function MetaConnectedActions({ isUrgent }: MetaConnectedActionsProps) {
  return (
    <>
      {/* `useSearchParams` obliga a un límite de Suspense: sin él, Next pasa la
          ruta entera a renderizado en cliente. */}
      <Suspense fallback={null}>
        <MetaAccountPicker />
      </Suspense>

      <form action={disconnectMetaAction} className="flex-1">
        <SecondaryButton
          type="submit"
          className="w-full"
          icon={<Unlink size={18} strokeWidth={2} aria-hidden />}
        >
          {CONNECTIONS_COPY.disconnect}
        </SecondaryButton>
      </form>

      <form action={connectMetaAction} className="flex-1">
        {isUrgent ? (
          <PrimaryButton type="submit" className="w-full">
            <RefreshCw size={18} strokeWidth={2} aria-hidden />
            {CONNECTIONS_COPY.reauthorize}
          </PrimaryButton>
        ) : (
          <SecondaryButton
            type="submit"
            className="w-full"
            icon={<RefreshCw size={18} strokeWidth={2} aria-hidden />}
          >
            {CONNECTIONS_COPY.reauthorize}
          </SecondaryButton>
        )}
      </form>
    </>
  );
}
