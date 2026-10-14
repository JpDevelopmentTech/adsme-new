import { z } from "zod";
import {
  CLIENT_COUNTRIES,
  CLIENT_GENRES,
  CLIENT_HANDLE_PATTERN,
  CLIENT_KINDS,
} from "@/constants/client-form.constants";
import { stripClientHandle, toClientHandle } from "@/utils/normalize-client-handle";

/** Valida el formulario de alta y edición de clientes. */
export const clientFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Ingresa el nombre artístico." }),
  // Se escribe sin arroba; si alguien la pone o usa mayúsculas, se limpia aquí
  // y se guarda siempre como `@usuario` en minúsculas, que es lo que exige la base.
  handle: z
    .string()
    .transform(stripClientHandle)
    .pipe(
      z.string().regex(CLIENT_HANDLE_PATTERN, {
        message: "Usa de 2 a 29 letras, números, punto o guion bajo, sin espacios.",
      }),
    )
    .transform(toClientHandle),
  kind: z.enum(CLIENT_KINDS),
  genre: z.enum(CLIENT_GENRES),
  email: z.email({ message: "Ingresa un correo electrónico válido." }).trim(),
  phone: z.string().trim().min(7, { message: "Ingresa un teléfono válido." }),
  city: z.string().trim().min(2, { message: "Ingresa la ciudad." }),
  country: z.enum(CLIENT_COUNTRIES),
  notes: z.string().trim().max(500, { message: "Máximo 500 caracteres." }),
});

export type ClientFormInput = z.infer<typeof clientFormSchema>;
