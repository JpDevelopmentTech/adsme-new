import type { ClientKind } from "@/domain/entities/client";

/** Datos que el usuario aporta al crear o editar un cliente. */
export interface ClientDraft {
  name: string;
  handle: string;
  kind: ClientKind;
  genre: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
  /** URL pública de la foto ya subida, o `null` para dejar al cliente sin foto. */
  avatarUrl: string | null;
}
