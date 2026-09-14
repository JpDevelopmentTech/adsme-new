import type { AuthResult } from "@/domain/entities/auth-result";
import type { AuthUser } from "@/domain/entities/auth-user";
import type { PasswordCredentials } from "@/domain/entities/password-credentials";

/**
 * Port de autenticación. El dominio depende de esta abstracción, nunca de Supabase.
 */
export interface AuthRepository {
  signInWithPassword(
    credentials: PasswordCredentials,
  ): Promise<AuthResult<AuthUser>>;

  /** Devuelve la URL de consentimiento del proveedor a la que hay que redirigir al usuario. */
  createGoogleAuthorizationUrl(redirectTo: string): Promise<AuthResult<string>>;

  /** Usuario de la sesión vigente, verificado contra el servidor de auth. */
  getCurrentUser(): Promise<AuthUser | null>;

  signOut(): Promise<void>;
}
