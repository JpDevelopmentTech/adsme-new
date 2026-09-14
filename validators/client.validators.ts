import { z } from "zod";
import {
  CLIENT_COUNTRIES,
  CLIENT_GENRES,
  CLIENT_KINDS,
} from "@/constants/client-form.constants";

/** Valida el formulario de alta y edición de clientes. */
export const clientFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Ingresa el nombre artístico." }),
  handle: z
    .string()
    .trim()
    .regex(/^@[a-z0-9._]{2,29}$/i, {
      message: "Usa @ seguido de 2 a 29 letras, números, punto o guion bajo.",
    }),
  kind: z.enum(CLIENT_KINDS),
  genre: z.enum(CLIENT_GENRES),
  email: z.email({ message: "Ingresa un correo electrónico válido." }).trim(),
  phone: z.string().trim().min(7, { message: "Ingresa un teléfono válido." }),
  city: z.string().trim().min(2, { message: "Ingresa la ciudad." }),
  country: z.enum(CLIENT_COUNTRIES),
  notes: z.string().trim().max(500, { message: "Máximo 500 caracteres." }),
});

export type ClientFormInput = z.infer<typeof clientFormSchema>;
