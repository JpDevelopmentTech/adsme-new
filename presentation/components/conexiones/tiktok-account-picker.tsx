"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  TIKTOK_ACCOUNT_COPY,
  TIKTOK_PICK_ACCOUNT_MANAGE,
  TIKTOK_PICK_ACCOUNT_PARAM,
  TIKTOK_PICK_ACCOUNT_VALUE,
} from "@/constants/tiktok-ads.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { listTiktokAccountsAction } from "@/presentation/actions/list-tiktok-accounts-action";
import { selectTiktokAccountsAction } from "@/presentation/actions/select-tiktok-accounts-action";
import { AccountMultiPicker } from "@/presentation/components/ui/account-multi-picker";

/** Selector de cuentas de anunciante de TikTok con sus textos y sus acciones. */
export function TiktokAccountPicker() {
  const router = useRouter();
  const requested = useSearchParams().get(TIKTOK_PICK_ACCOUNT_PARAM);

  return (
    <AccountMultiPicker
      isOpen={
        requested === TIKTOK_PICK_ACCOUNT_VALUE ||
        requested === TIKTOK_PICK_ACCOUNT_MANAGE
      }
      onClose={() => router.replace(CONNECTIONS_ROUTE)}
      isAfterConnect={requested === TIKTOK_PICK_ACCOUNT_VALUE}
      copy={TIKTOK_ACCOUNT_COPY}
      load={listTiktokAccountsAction}
      action={selectTiktokAccountsAction}
    />
  );
}
