"use client";

import { useFormStatus } from "react-dom";
import { ScreenLoader } from "@/presentation/components/ui/screen-loader";
import type { FormScreenLoaderProps } from "@/types/ui.types";

/**
 * Lámina de espera atada al formulario que la contiene. Basta con montarla
 * dentro de un `<form action={…}>` para que se encienda mientras la acción está
 * en vuelo, así que cubre cualquier server action de la app sin estado propio.
 */
export function FormScreenLoader({ title, hint }: FormScreenLoaderProps) {
  const { pending } = useFormStatus();

  return <ScreenLoader isActive={pending} title={title} hint={hint} />;
}
