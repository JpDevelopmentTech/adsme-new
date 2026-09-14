/** Resultado de una operación que puede fallar de forma esperada. */
export type Result<TValue, TError> =
  | { success: true; value: TValue }
  | { success: false; error: TError };
