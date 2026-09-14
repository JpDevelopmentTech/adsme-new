import { LogIn, RefreshCw, Unlink } from "lucide-react";
import { Suspense } from "react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { connectTiktokAction } from "@/presentation/actions/connect-tiktok-action";
import { disconnectTiktokAction } from "@/presentation/actions/disconnect-tiktok-action";
import { TiktokAccountPicker } from "@/presentation/components/conexiones/tiktok-account-picker";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";

/** Botón que arranca el OAuth de TikTok Ads. */
export function TiktokConnectAction() {
  return (
    <form action={connectTiktokAction} className="w-full">
      <PrimaryButton type="submit" className="w-full">
        <LogIn size={18} strokeWidth={2} aria-hidden />
        {CONNECTIONS_COPY.connect}
      </PrimaryButton>
    </form>
  );
}

/**
 * Acciones de la cuenta ya conectada. A diferencia de Meta, TikTok renueva su
 * acceso solo mientras el permiso siga concedido, así que reautorizar nunca es
 * urgente: solo hace falta si el usuario revoca el acceso desde TikTok.
 */
export function TiktokConnectedActions() {
  return (
    <>
      {/* `useSearchParams` obliga a un límite de Suspense: sin él, Next pasa la
          ruta entera a renderizado en cliente. */}
      <Suspense fallback={null}>
        <TiktokAccountPicker />
      </Suspense>

      <form action={disconnectTiktokAction} className="flex-1">
        <SecondaryButton
          type="submit"
          className="w-full"
          icon={<Unlink size={18} strokeWidth={2} aria-hidden />}
        >
          {CONNECTIONS_COPY.disconnect}
        </SecondaryButton>
      </form>

      <form action={connectTiktokAction} className="flex-1">
        <SecondaryButton
          type="submit"
          className="w-full"
          icon={<RefreshCw size={18} strokeWidth={2} aria-hidden />}
        >
          {CONNECTIONS_COPY.reauthorize}
        </SecondaryButton>
      </form>
    </>
  );
}
