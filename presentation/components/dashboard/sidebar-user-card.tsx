import { ChevronsUpDown, LogOut } from "lucide-react";
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
        <span className="flex items-center gap-3 rounded-[16px] border border-border bg-surface p-2.5 transition-colors duration-150 hover:bg-g-100">
          <Avatar initials={user.initials} size={36} fontSize={12} />
          <span className="flex min-w-0 flex-1 flex-col items-start">
            <span className="w-full truncate text-[13px] font-normal text-text-primary">
              {user.displayName}
            </span>
            <span className="text-xs font-normal text-text-muted">{user.role}</span>
          </span>
          <ChevronsUpDown
            size={16}
            strokeWidth={1.5}
            className={`shrink-0 text-text-muted transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      )}
    >
      <form action={signOutAction}>
        <button
          type="submit"
          role="menuitem"
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-normal text-text-secondary transition-colors duration-100 hover:bg-surface hover:text-text-primary"
        >
          <LogOut size={16} strokeWidth={1.5} aria-hidden />
          Cerrar sesión
        </button>
      </form>
    </DropdownMenu>
  );
}
