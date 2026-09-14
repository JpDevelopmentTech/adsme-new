"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { TextField } from "@/presentation/components/ui/text-field";
import type { PasswordFieldProps } from "@/types/ui.types";

export function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ToggleIcon = isVisible ? Eye : EyeOff;

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="text-text-muted transition-colors hover:text-text-secondary"
        >
          <ToggleIcon size={18} strokeWidth={1.75} aria-hidden />
        </button>
      }
    />
  );
}
