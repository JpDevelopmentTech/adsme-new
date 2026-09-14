import type { AuthErrorCode } from "@/domain/entities/auth-error";

/** Mensajes mostrados al usuario por cada motivo de fallo de autenticación. */
export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  invalid_credentials: "Correo o contraseña incorrectos.",
  email_not_confirmed:
    "Todavía no confirmaste tu correo. Revisa tu bandeja de entrada.",
  rate_limited: "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
  provider_disabled:
    "El acceso con Google Workspace no está habilitado todavía.",
  unknown: "No pudimos iniciar sesión. Inténtalo de nuevo en unos segundos.",
};

export const INVALID_EMAIL_MESSAGE = "Ingresa un correo electrónico válido.";

export const REQUIRED_PASSWORD_MESSAGE = "Ingresa tu contraseña.";
