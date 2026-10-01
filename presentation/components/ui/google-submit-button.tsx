"use client";

import { useFormStatus } from "react-dom";
import { LOGIN_COPY } from "@/constants/auth-copy.constants";
import { GoogleMark } from "@/presentation/components/auth/google-mark";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";

/** Botón de envío que refleja el estado pendiente del formulario que lo contiene. */
export function GoogleSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <SecondaryButton
      type="submit"
      isLoading={pending}
      className="min-h-[52px] w-full gap-3 text-[15px]"
      icon={<GoogleMark />}
    >
      {LOGIN_COPY.googleSubmit}
    </SecondaryButton>
  );
}
