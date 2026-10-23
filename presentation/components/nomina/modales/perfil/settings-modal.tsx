"use client";

import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { ENROLL_COPY } from "@/constants/nomina-enrollment-copy.constants";
import { SETTINGS_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { FieldMessage } from "@/presentation/components/nomina/modales/campos/field-message";
import { SettingsLinksTab } from "@/presentation/components/nomina/modales/perfil/settings-links-tab";
import { SettingsModelTab } from "@/presentation/components/nomina/modales/perfil/settings-model-tab";
import { SettingsTabs } from "@/presentation/components/nomina/modales/perfil/settings-tabs";
import { FormModal } from "@/presentation/components/ui/form-modal";
import { useArtistSettings } from "@/presentation/hooks/use-artist-settings";
import type { SettingsModalProps } from "@/types/nomina-modales-perfil.types";

/** «Configuración de {artista}»: modelo de reparto y redes, en pestañas. Guardar guarda la pestaña abierta. */
export function SettingsModal(props: SettingsModalProps) {
  const { isOpen, onClose, artist } = props;
  const settings = useArtistSettings(props);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={SETTINGS_MODAL_COPY.title(artist.name)}
      closeLabel={MODAL_COMMON_COPY.close}
      widthClassName="w-[min(680px,calc(100vw-2rem))]"
      headerExtra={<SettingsTabs value={settings.tab} onChange={settings.setTab} />}
      submitLabel={settings.isSaving ? ENROLL_COPY.saving : MODAL_COMMON_COPY.save}
      cancelLabel={MODAL_COMMON_COPY.cancel}
      isSubmitDisabled={!settings.canSave}
      onSubmit={settings.submit}
    >
      <div className="flex flex-col gap-5">
        {settings.error ? <FieldMessage tone="danger">{settings.error}</FieldMessage> : null}
        {settings.tab === "modelo" ? <SettingsModelTab settings={settings} artist={artist} /> : <SettingsLinksTab settings={settings} artist={artist} />}
      </div>
    </FormModal>
  );
}
