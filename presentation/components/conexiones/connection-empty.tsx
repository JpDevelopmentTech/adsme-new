import { LogIn } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import type { ConnectionEmptyProps } from "@/types/connections.types";

/** Cuerpo de la tarjeta cuando la cuenta todavía no está vinculada. */
export function ConnectionEmpty({ name, action }: ConnectionEmptyProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <p className="text-center text-[13px] leading-[1.4] text-text-secondary">
        {CONNECTIONS_COPY.connectInvite(name)}
      </p>

      {action ?? (
        <PrimaryButton
          type="button"
          disabled
          title={CONNECTIONS_COPY.pendingOauth}
          className="w-full"
        >
          <LogIn size={18} strokeWidth={2} aria-hidden />
          {CONNECTIONS_COPY.connect}
        </PrimaryButton>
      )}

      <p className="text-center text-[11px] text-text-muted">
        {CONNECTIONS_COPY.connectHint}
      </p>
    </div>
  );
}
