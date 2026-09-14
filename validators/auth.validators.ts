import { z } from "zod";
import {
  INVALID_EMAIL_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
} from "@/constants/auth-messages.constants";

/** Valida el formulario de inicio de sesión antes de tocar el proveedor de auth. */
export const signInSchema = z.object({
  email: z.email({ message: INVALID_EMAIL_MESSAGE }).trim(),
  password: z.string().min(1, { message: REQUIRED_PASSWORD_MESSAGE }),
  rememberMe: z.boolean(),
});

export type SignInInput = z.infer<typeof signInSchema>;
