/** Estado devuelto por la Server Action de inicio de sesión hacia el formulario. */
export interface SignInFormState {
  message: string | null;
  fieldErrors: SignInFieldErrors;
}

export interface SignInFieldErrors {
  email?: string;
  password?: string;
}
