"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  META_ACCOUNT_COPY,
  META_PICK_ACCOUNT_MANAGE,
  META_PICK_ACCOUNT_PARAM,
  META_PICK_ACCOUNT_VALUE,
} from "@/constants/meta-ads.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { listMetaAccountsAction } from "@/presentation/actions/list-meta-accounts-action";
import { selectMetaAccountsAction } from "@/presentation/actions/select-meta-accounts-action";
import { AccountMultiPicker } from "@/presentation/components/ui/account-multi-picker";

/**
 * Selector de cuentas publicitarias de Meta con sus textos y sus acciones.
 * Quién lo abre es la URL, no un estado local: así lo lanzan por igual la
 * vuelta del OAuth y el menú de la conexión, que se cierra al pulsar y no
 * puede quedarse con el selector dentro.
 */
export function MetaAccountPicker() {
  const router = useRouter();
  const requested = useSearchParams().get(META_PICK_ACCOUNT_PARAM);

  return (
    <AccountMultiPicker
      isOpen={
        requested === META_PICK_ACCOUNT_VALUE ||
        requested === META_PICK_ACCOUNT_MANAGE
      }
      onClose={() => router.replace(CONNECTIONS_ROUTE)}
      isAfterConnect={requested === META_PICK_ACCOUNT_VALUE}
      copy={META_ACCOUNT_COPY}
      load={listMetaAccountsAction}
      action={selectMetaAccountsAction}
    />
  );
}
