"use client";

import { AgesField } from "@/presentation/components/cotizador/campana/ages-field";
import { ArtistField } from "@/presentation/components/cotizador/campana/artist-field";
import { GenreField } from "@/presentation/components/cotizador/campana/genre-field";
import { InterestsField } from "@/presentation/components/cotizador/campana/interests-field";
import { ProjectField } from "@/presentation/components/cotizador/campana/project-field";
import { SexField } from "@/presentation/components/cotizador/campana/sex-field";
import { TargetField } from "@/presentation/components/cotizador/campana/target-field";
import type { CampaignSummaryProps } from "@/types/quote-campaign.types";

/** Campos de la campaña desplegada, en grupos separados por filetes. */
export function CampaignFields({ id }: CampaignSummaryProps) {
  return (
    <div id={id} className="flex flex-col gap-5">
      <ArtistField />
      <ProjectField />
      <GenreField />
      <div className="flex flex-col gap-5 border-t border-border pt-5">
        <TargetField />
        <div className="grid gap-5 sm:grid-cols-2">
          <SexField />
          <AgesField />
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <InterestsField />
      </div>
    </div>
  );
}
