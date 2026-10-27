import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import { EditableProfilePhoto } from "@/presentation/components/nomina/perfil/editable-profile-photo";
import type { ProfilePhotoProps } from "@/types/nomina-perfil.types";

/** Foto grande del artista con su semáforo; en el panel se puede cambiar, en el portal no. */
export function ProfilePhoto({ isReadOnly = false, ...photo }: ProfilePhotoProps) {
  if (!isReadOnly) return <EditableProfilePhoto {...photo} />;
  return <ArtistAvatar name={photo.name} photoUrl={photo.photoUrl} size={104} semaphore={photo.semaphore} />;
}
