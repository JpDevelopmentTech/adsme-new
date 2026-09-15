import { LogIn, RefreshCw, Unlink, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import {
  META_PICK_ACCOUNT_MANAGE,
  META_PICK_ACCOUNT_PARAM,
} from "@/constants/meta-ads.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { connectMetaAction } from "@/presentation/actions/connect-meta-action";
import { disconnectMetaAction } from "@/presentation/actions/disconnect-meta-action";
import { ConnectionActionsMenu } from "@/presentation/components/conexiones/connection-actions-menu";
import { MetaAccountPicker } from "@/presentation/components/conexiones/meta-account-picker";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { MENU_ITEM_CLASSES } from "@/utils/menu-item-styles";
import type { MetaConnectedActionsProps } from "@/types/connections.types";

/** Enlace que pide abrir el selector de cuentas; lo escucha `MetaAccountPicker`. */
const PICK_ACCOUNTS_HREF = `${CONNECTIONS_ROUTE}?${META_PICK_ACCOUNT_PARAM}=${META_PICK_ACCOUNT_MANAGE}`;

/** Botón que arranca el OAuth de Meta Ads. */
export function MetaConnectAction() {
  return (
    <form action={connectMetaAction}>
      <PrimaryButton type="submit">
        <LogIn size={15} strokeWidth={1.75} aria-hidden />
        {CONNECTIONS_COPY.connect}
      </PrimaryButton>
    </form>
  );
}

/**
 * Acciones de la cuenta ya conectada. Solo una queda a la vista y es la que
 * toca: renovar el acceso cuando está por caducar, elegir cuentas el resto del
 * tiempo. Reautorizar rehace el OAuth, que es la única forma de renovar un
 * token de larga duración de Meta.
 */
export function MetaConnectedActions({ isUrgent }: MetaConnectedActionsProps) {
  return (
    <>
      {/* `useSearchParams` obliga a un límite de Suspense: sin él, Next pasa la
          ruta entera a renderizado en cliente. */}
      <Suspense fallback={null}>
        <MetaAccountPicker />
      </Suspense>

      {isUrgent ? (
        <form action={connectMetaAction}>
          <PrimaryButton type="submit">
            <RefreshCw size={15} strokeWidth={1.75} aria-hidden />
            {CONNECTIONS_COPY.reauthorize}
          </PrimaryButton>
        </form>
      ) : (
        <SecondaryLink href={PICK_ACCOUNTS_HREF}>
          <Users size={15} strokeWidth={1.5} aria-hidden />
          {CONNECTIONS_COPY.manage}
        </SecondaryLink>
      )}

      <ConnectionActionsMenu platform="Meta Ads">
        {isUrgent ? (
          <Link
            href={PICK_ACCOUNTS_HREF}
            role="menuitem"
            className={MENU_ITEM_CLASSES}
          >
            <Users size={15} strokeWidth={1.5} aria-hidden />
            {CONNECTIONS_COPY.manage}
          </Link>
        ) : (
          <form action={connectMetaAction}>
            <button type="submit" role="menuitem" className={MENU_ITEM_CLASSES}>
              <RefreshCw size={15} strokeWidth={1.5} aria-hidden />
              {CONNECTIONS_COPY.reauthorize}
            </button>
          </form>
        )}

        <form action={disconnectMetaAction}>
          <button type="submit" role="menuitem" className={MENU_ITEM_CLASSES}>
            <Unlink size={15} strokeWidth={1.5} aria-hidden />
            {CONNECTIONS_COPY.disconnect}
          </button>
        </form>
      </ConnectionActionsMenu>
    </>
  );
}
