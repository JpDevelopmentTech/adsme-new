"use client";

import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import { SHARE_MODAL_COPY } from "@/constants/nomina-modales-perfil-copy.constants";
import { ShareSection } from "@/presentation/components/nomina/modales/perfil/share-section";
import { ModalHeader } from "@/presentation/components/ui/modal-header";
import { ModalSheet } from "@/presentation/components/ui/modal-sheet";
import type { ProfileModalProps } from "@/types/nomina-modales-perfil.types";

/**
 * «Compartir perfil»: cómo dar acceso de solo lectura y las listas de
 * solicitudes y accesos. Sin base compartida todavía, ambas listas van vacías.
 */
export function ShareModal({ isOpen, onClose, artist }: ProfileModalProps) {
  return (
    <ModalSheet isOpen={isOpen} label={SHARE_MODAL_COPY.title} onClose={onClose} widthClassName="w-[min(560px,calc(100vw-2rem))]">
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className="border-b border-border">
          <ModalHeader title={SHARE_MODAL_COPY.title} subtitle={SHARE_MODAL_COPY.subtitle(artist.name)} closeLabel={MODAL_COMMON_COPY.close} onClose={onClose} />
        </div>
        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-6 py-6 sm:px-8">
          <section className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
            <h3 className="text-sm font-light text-text-primary">{SHARE_MODAL_COPY.howTitle}</h3>
            <ol className="flex flex-col gap-2.5">
              {SHARE_MODAL_COPY.steps(artist.name).map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-[13px] leading-[1.45] font-light text-text-secondary">
                  <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-pill border border-border-strong text-[11px] text-text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <ShareSection title={SHARE_MODAL_COPY.pending(0)} emptyText={SHARE_MODAL_COPY.pendingEmpty} />
          <ShareSection title={SHARE_MODAL_COPY.granted(0)} emptyText={SHARE_MODAL_COPY.grantedEmpty} />
        </div>
      </div>
    </ModalSheet>
  );
}
