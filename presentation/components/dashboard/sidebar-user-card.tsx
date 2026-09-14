import { ChevronDown, LogOut } from "lucide-react";
import { signOutAction } from "@/presentation/actions/sign-out-action";
import { Avatar } from "@/presentation/components/ui/avatar";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { SidebarUserCardProps } from "@/types/dashboard.types";

/** Bloque inferior del sidebar con la identidad del usuario y el cierre de sesión. */
export function SidebarUserCard({ user }: SidebarUserCardProps) {
  return (
    <DropdownMenu
      label="Menú de la cuenta"
      trigger={(isOpen) => (
        <span className="flex items-center gap-[11px] px-2 py-3">
          <Avatar initials={user.initials} size={38} />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[13px] font-semibold text-text-primary">
              {user.displayName}
            </span>
            <span className="text-[11px] text-text-muted">{user.role}</span>
          </span>
          <ChevronDown
            size={16}
            className={`text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      )}
    >
      <form action={signOutAction}>
        <button
          type="submit"
          role="menuitem"
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
        >
          <LogOut size={16} aria-hidden />
          Cerrar sesión
        </button>
      </form>
    </DropdownMenu>
  );
}
