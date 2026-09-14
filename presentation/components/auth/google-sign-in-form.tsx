import { signInWithGoogleAction } from "@/presentation/actions/sign-in-with-google-action";
import { GoogleSubmitButton } from "@/presentation/components/ui/google-submit-button";

/** Formulario de un solo botón que delega el acceso en el flujo OAuth de Google Workspace. */
export function GoogleSignInForm() {
  return (
    <form action={signInWithGoogleAction} className="w-full">
      <GoogleSubmitButton />
    </form>
  );
}
