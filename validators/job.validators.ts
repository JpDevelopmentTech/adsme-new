import { z } from "zod";
import { JOB_FORMATS } from "@/constants/job-wizard.constants";

/** Valida el paso 1 del asistente: datos básicos del trabajo. */
export const jobBasicsSchema = z
  .object({
    title: z.string().trim().min(2, { message: "Ingresa el nombre de la canción." }),
    clientId: z.string().min(1, { message: "Elige el cliente del lanzamiento." }),
    format: z.enum(JOB_FORMATS),
    startsOn: z.string().min(1, { message: "Elige la fecha de inicio." }),
    endsOn: z.string().min(1, { message: "Elige la fecha de fin." }),
    investment: z.coerce
      .number({ message: "Escribe la inversión en números." })
      .int({ message: "La inversión no admite decimales." })
      .min(0, { message: "La inversión no puede ser negativa." }),
    description: z.string().trim().max(500, { message: "Máximo 500 caracteres." }),
  })
  .refine((values) => values.endsOn >= values.startsOn, {
    message: "El fin debe ser posterior al inicio.",
    path: ["endsOn"],
  });

export type JobBasicsInput = z.infer<typeof jobBasicsSchema>;
