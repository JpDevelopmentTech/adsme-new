import { DEFAULT_USER_ROLE } from "@/constants/dashboard-copy.constants";
import type { AuthUser } from "@/domain/entities/auth-user";
import type { CurrentUserSummary } from "@/types/dashboard.types";
import { getInitials } from "@/utils/get-initials";

/** Adapta la entidad de dominio a lo que el shell necesita mostrar. */
export function toCurrentUserSummary(user: AuthUser): CurrentUserSummary {
  return {
    displayName: user.displayName?.trim() || user.email,
    initials: getInitials(user.displayName, user.email),
    role: DEFAULT_USER_ROLE,
  };
}
