import { Plus } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";
import { NotificationsButton } from "@/presentation/components/dashboard/notifications-button";
import { TopbarSearch } from "@/presentation/components/dashboard/topbar-search";
import { Avatar } from "@/presentation/components/ui/avatar";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import type { AppSidebarProps } from "@/types/dashboard.types";

export function AppTopbar({ user }: AppSidebarProps) {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-border bg-canvas px-7">
      <TopbarSearch />

      <div className="flex items-center gap-4">
        <PrimaryLink href={NEW_JOB_ROUTE} className="hidden sm:flex">
          <Plus size={18} strokeWidth={2} aria-hidden />
          {TOPBAR_COPY.newJob}
        </PrimaryLink>
        <NotificationsButton />
        <Avatar initials={user.initials} size={42} />
      </div>
    </header>
  );
}
