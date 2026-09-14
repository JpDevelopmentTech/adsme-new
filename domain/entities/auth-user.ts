/** Usuario autenticado, expresado en términos del dominio y libre de detalles del proveedor. */
export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
}
