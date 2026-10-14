import { SOCIAL_NETWORKS } from "@/constants/nomina-modales-redes.constants";
import { SETTINGS_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { SocialLinkField } from "@/presentation/components/nomina/modales/perfil/social-link-field";
import type { SettingsTabPanelProps } from "@/types/nomina-modales-perfil.types";

/** Pestaña «Redes y enlaces»: un campo por red, en el orden del perfil. */
export function SettingsLinksTab({ settings }: SettingsTabPanelProps) {
  return (
    <div id="settings-panel-redes" role="tabpanel" aria-labelledby="settings-tab-redes" className="flex flex-col gap-5">
      <p className="text-sm leading-[1.5] font-light text-text-secondary">{SETTINGS_MODAL_COPY.linksIntro}</p>
      {SOCIAL_NETWORKS.map((meta) => (
        <SocialLinkField key={meta.key} meta={meta} value={settings.links[meta.key]} onChange={(url) => settings.setLink(meta.key, url)} />
      ))}
    </div>
  );
}
