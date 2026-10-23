"use client";

import { ENROLL_COPY } from "@/constants/nomina-enrollment-copy.constants";
import { MODAL_COMMON_COPY, NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { ArtistSetupColumn } from "@/presentation/components/nomina/modales/nuevo-artista/artist-setup-column";
import { ClientPickerStep } from "@/presentation/components/nomina/modales/nuevo-artista/client-picker-step";
import { SplitModelEditor } from "@/presentation/components/nomina/modales/reparto/split-model-editor";
import { FormModal } from "@/presentation/components/ui/form-modal";
import { useNewArtistForm } from "@/presentation/hooks/use-new-artist-form";
import type { NewArtistModalProps } from "@/types/nomina-modales-artista.types";

/**
 * Modal «Nuevo artista»: primero se elige el cliente que entra a Nómina y
 * luego su nómina, vigencia y modelo de reparto. Guardar lo inscribe.
 */
export function NewArtistModal({ isOpen, onClose, eligibleClients, initialClient }: NewArtistModalProps) {
  const form = useNewArtistForm(initialClient, onClose);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={NEW_ARTIST_COPY.title}
      subtitle={ENROLL_COPY.subtitle}
      closeLabel={MODAL_COMMON_COPY.close}
      widthClassName={form.client ? "w-[min(1000px,calc(100vw-2rem))]" : "w-[min(560px,calc(100vw-2rem))]"}
      submitLabel={form.isSaving ? ENROLL_COPY.saving : MODAL_COMMON_COPY.save}
      cancelLabel={MODAL_COMMON_COPY.cancel}
      isSubmitDisabled={!form.canSave}
      onSubmit={form.submit}
    >
      {form.client ? (
        <div className="flex flex-col gap-6">
          {form.error ? <FieldMessage tone="danger">{form.error}</FieldMessage> : null}
          <div className="grid gap-8 md:grid-cols-2">
            <ArtistSetupColumn form={form} canChangeClient={!initialClient} />
            <SplitModelEditor idPrefix="new-artist" settings={form.split.settings} model={form.split.model} viability={form.split.viability} onChange={form.split.update} />
          </div>
        </div>
      ) : (
        <ClientPickerStep clients={eligibleClients} onPick={form.setClient} />
      )}
    </FormModal>
  );
}
