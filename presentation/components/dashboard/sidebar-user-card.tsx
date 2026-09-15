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
        <span className="flex items-center gap-[10px] px-[10px] py-1.5">
          <Avatar initials={user.initials} size={34} fontSize={11.5} />
          <span className="flex min-w-0 flex-1 flex-col items-start gap-px">
            <span className="truncate text-[12.5px] font-normal text-text-primary">
              {user.displayName}
            </span>
            <span className="text-[10px] font-medium tracking-[1.4px] text-text-muted uppercase">
              {user.role}
            </span>
          </span>
          <ChevronsUpDown
            size={15}
            strokeWidth={1.5}
            className={`text-text-muted transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      )}
    >
      <form action={signOutAction}>
        <button
          type="submit"
          role="menuitem"
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[12.5px] text-text-secondary transition-colors duration-100 hover:bg-g-100 hover:text-text-primary"
        >
          <LogOut size={15} strokeWidth={1.5} aria-hidden />
          Cerrar sesión
        </button>
      </form>
    </DropdownMenu>
  );
}
