"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { NominaActionRunner, NominaActionState } from "@/types/nomina-actions.types";

/**
 * Lanza una acción de Nómina en una transición: guarda el mensaje si falla y,
 * si sale bien, avisa con `onDone` y refresca la ruta con los datos nuevos.
 */
export function useNominaAction<TInput>(action: (input: TInput) => Promise<NominaActionState>, onDone: () => void): NominaActionRunner<TInput> {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const run = (input: TInput) => {
    setError(null);
    startTransition(async () => {
      const result = await action(input);
      if (!result.ok) return setError(result.message);
      onDone();
      router.refresh();
    });
  };

  return { run, isPending, error };
}
