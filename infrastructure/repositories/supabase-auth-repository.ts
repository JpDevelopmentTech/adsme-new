import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { AuthResult } from "@/domain/entities/auth-result";
import type { AuthUser } from "@/domain/entities/auth-user";
import type { PasswordCredentials } from "@/domain/entities/password-credentials";
import type { AuthRepository } from "@/domain/interfaces/auth-repository";
import { toAuthError } from "@/infrastructure/repositories/supabase-auth-error-mapper";

/** Implementación del port de autenticación sobre Supabase Auth. */
export function createSupabaseAuthRepository(
  client: SupabaseClient,
): AuthRepository {
  return {
    async signInWithPassword(
      credentials: PasswordCredentials,
    ): Promise<AuthResult<AuthUser>> {
      const { data, error } = await client.auth.signInWithPassword(credentials);

      if (error || !data.user) {
        return { success: false, error: toAuthError(error) };
      }

      return { success: true, value: toAuthUser(data.user) };
    },

    async createGoogleAuthorizationUrl(
      redirectTo: string,
    ): Promise<AuthResult<string>> {
      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo, queryParams: { prompt: "select_account" } },
      });

      if (error || !data.url) {
        return { success: false, error: toAuthError(error) };
      }

      return { success: true, value: data.url };
    },

    async getCurrentUser(): Promise<AuthUser | null> {
      const { data, error } = await client.auth.getUser();

      if (error || !data.user) return null;

      return toAuthUser(data.user);
    },

    async signOut(): Promise<void> {
      await client.auth.signOut();
    },
  };
}

/** Traduce el usuario de Supabase a la entidad de dominio. */
function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    displayName: (user.user_metadata?.full_name as string | undefined) ?? null,
    avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? null,
  };
}
