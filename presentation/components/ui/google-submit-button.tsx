"use client";

// El diseño usa el icono `chrome` de lucide, retirado en lucide-react v1 junto al resto
// de marcas; `Aperture` es el equivalente visual más cercano dentro del set actual.
import { Aperture } from "lucide-react";
import { useFormStatus } from "react-dom";
import { LOGIN_COPY } from "@/constants/auth-copy.constants";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";

/** Botón de envío que refleja el estado pendiente del formulario que lo contiene. */
export function GoogleSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <SecondaryButton
      type="submit"
      isLoading={pending}
      className="w-full py-3.5"
      icon={<Aperture size={18} className="text-data-cyan" aria-hidden />}
    >
      {LOGIN_COPY.googleSubmit}
    </SecondaryButton>
  );
}
