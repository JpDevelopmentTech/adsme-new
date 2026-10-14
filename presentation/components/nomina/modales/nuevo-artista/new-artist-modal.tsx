"use client";

import { MODAL_COMMON_COPY, NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { ArtistSetupColumn } from "@/presentation/components/nomina/modales/nuevo-artista/artist-setup-column";
import { SplitModelEditor } from "@/presentation/components/nomina/modales/reparto/split-model-editor";
import { FormModal } from "@/presentation/components/ui/form-modal";
import { useNewArtistForm } from "@/presentation/hooks/use-new-artist-form";
import type { NewArtistModalProps } from "@/types/nomina-modales-artista.types";

/**
 * Modal «Nuevo artista»: datos del artista a la izquierda y su modelo de
 * reparto a la derecha (una columna en móvil). Pegar una imagen en cualquier
 * parte del modal la toma como foto. Guardar solo cierra: no hay persistencia.
 */
export function NewArtistModal({ isOpen, onClose, existingNames }: NewArtistModalProps) {
  const form = useNewArtistForm(existingNames);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={NEW_ARTIST_COPY.title}
      subtitle={NEW_ARTIST_COPY.subtitle}
      closeLabel={MODAL_COMMON_COPY.close}
      widthClassName="w-[min(1000px,calc(100vw-2rem))]"
      submitLabel={MODAL_COMMON_COPY.save}
      cancelLabel={MODAL_COMMON_COPY.cancel}
      isSubmitDisabled={!form.canSave}
      onSubmit={onClose}
    >
      <div
        className="grid gap-8 md:grid-cols-2"
        onPaste={(event) => {
          const file = event.clipboardData.files[0];
          if (file?.type.startsWith("image/")) {
            event.preventDefault();
            form.photo.selectFile(file);
          }
        }}
      >
        <ArtistSetupColumn form={form} />
        <SplitModelEditor
          idPrefix="new-artist"
          settings={form.split.settings}
          model={form.split.model}
          viability={form.split.viability}
          onChange={form.split.update}
        />
      </div>
    </FormModal>
  );
}
