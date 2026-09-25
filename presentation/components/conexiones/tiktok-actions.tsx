import { LogIn, RefreshCw, Users } from "lucide-react";
import { Suspense } from "react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import {
  TIKTOK_PICK_ACCOUNT_MANAGE,
  TIKTOK_PICK_ACCOUNT_PARAM,
} from "@/constants/tiktok-ads.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { connectTiktokAction } from "@/presentation/actions/connect-tiktok-action";
import { disconnectTiktokAction } from "@/presentation/actions/disconnect-tiktok-action";
import { ConnectionActionsMenu } from "@/presentation/components/conexiones/connection-actions-menu";
import { TiktokAccountPicker } from "@/presentation/components/conexiones/tiktok-account-picker";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { MENU_ITEM_CLASSES } from "@/utils/menu-item-styles";

/** Enlace que pide abrir el selector de cuentas; lo escucha `TiktokAccountPicker`. */
const PICK_ACCOUNTS_HREF = `${CONNECTIONS_ROUTE}?${TIKTOK_PICK_ACCOUNT_PARAM}=${TIKTOK_PICK_ACCOUNT_MANAGE}`;

/** Botón que arranca el OAuth de TikTok Ads. */
export function TiktokConnectAction() {
  return (
    <form action={connectTiktokAction}>
      <PrimaryButton type="submit">
        <LogIn size={15} strokeWidth={1.75} aria-hidden />
        {CONNECTIONS_COPY.connect}
      </PrimaryButton>
    </form>
  );
}

/**
 * Acciones de la cuenta ya conectada. A diferencia de Meta, TikTok renueva su
 * acceso solo mientras el permiso siga concedido, así que renovar nunca es
 * urgente: la acción visible es siempre elegir cuentas.
 */
export function TiktokConnectedActions() {
  return (
    <>
      {/* `useSearchParams` obliga a un límite de Suspense: sin él, Next pasa la
          ruta entera a renderizado en cliente. */}
      <Suspense fallback={null}>
        <TiktokAccountPicker />
      </Suspense>

      <SecondaryLink href={PICK_ACCOUNTS_HREF}>
        <Users size={15} strokeWidth={1.5} aria-hidden />
        {CONNECTIONS_COPY.manage}
      </SecondaryLink>

      <ConnectionActionsMenu
        platform="TikTok Ads"
        disconnectAction={disconnectTiktokAction}
      >
        <form action={connectTiktokAction}>
          <button type="submit" role="menuitem" className={MENU_ITEM_CLASSES}>
            <RefreshCw size={15} strokeWidth={1.5} aria-hidden />
            {CONNECTIONS_COPY.reauthorize}
          </button>
        </form>
      </ConnectionActionsMenu>
    </>
  );
}
