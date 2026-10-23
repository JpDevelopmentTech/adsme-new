"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { NOMINA_ARTISTS_ROUTE } from "@/constants/routes.constants";
import { unenrollNominaArtistAction } from "@/presentation/actions/unenroll-nomina-artist-action";
import type { UnenrollState } from "@/types/nomina-modales-perfil.types";

/** Baja de Nómina: llama a la acción y, si sale bien, vuelve al roster. */
export function useUnenrollArtist(clientId: string, onDone: () => void): UnenrollState {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const unenroll = () => {
    setError(null);
    startTransition(async () => {
      const result = await unenrollNominaArtistAction(clientId);
      if (!result.ok) return setError(result.message);
      onDone();
      router.push(NOMINA_ARTISTS_ROUTE);
    });
  };

  return { unenroll, isPending, error };
}
