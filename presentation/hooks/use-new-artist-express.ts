"use client";

import { useState } from "react";
import { EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import type { NewArtistExpressState } from "@/types/nomina-modales-artista.types";

/**
 * Bloque Express del alta: monto base (o propio) y mes que cubre. Al activarlo
 * o al elegir un monto base avisa con la nómina de ese tramo para precargarla.
 */
export function useNewArtistExpress(onPresetNomina: (nomina: number) => void): NewArtistExpressState {
  const [isOn, setIsOnState] = useState(false);
  const [preset, setPresetState] = useState<string>(EXPRESS_PRESETS[0].value);
  const [otherAmount, setOtherAmount] = useState<number | null>(null);
  const [coveredMonth, setCoveredMonth] = useState("");

  const presetNomina = (value: string) => {
    const match = EXPRESS_PRESETS.find((item) => item.value === value);
    if (match) onPresetNomina(match.nomina);
  };

  const setIsOn = (next: boolean) => {
    setIsOnState(next);
    if (next) presetNomina(preset);
  };

  const setPreset = (value: string) => {
    setPresetState(value);
    presetNomina(value);
  };

  const amount = preset === EXPRESS_OTHER ? (otherAmount ?? 0) : (EXPRESS_PRESETS.find((item) => item.value === preset)?.amount ?? 0);

  return { isOn, setIsOn, preset, setPreset, otherAmount, setOtherAmount, coveredMonth, setCoveredMonth, amount };
}
