import type { NominaExpense } from "@/domain/entities/nomina-expense";

/** Gastos de muestra por artista: pagos de Servicio y a proveedores de Ads. */
export const SAMPLE_EXPENSES: Record<string, NominaExpense[]> = {
  "valeria-gomez": [
    { id: "g-vg-1", type: "spotify", concept: "Playlist Pop Latino", provider: "Curaduría Andina", description: "Campaña de 30 días en playlists de pop", amount: 1_500_000, target: "ads", date: "2026-10-06", assignedMonth: "2026-10" },
    { id: "g-vg-2", type: "servicio", concept: "Pago de Servicio", provider: "AdsME", description: "Servicio de octubre", amount: 600_000, target: "servicio", date: "2026-10-03", assignedMonth: "2026-10" },
    { id: "g-vg-3", type: "otro", concept: "Pauta del single «Corazón de Neón»", provider: "Agencia Pulso", description: "Pauta en Meta y YouTube", amount: 2_800_000, target: "ads", date: "2026-09-18", assignedMonth: "2026-09" },
    { id: "g-vg-4", type: "spotify", concept: "Playlist Urbano", provider: "Curaduría Andina", description: "Playlists urbanas por 30 días", amount: 1_800_000, target: "ads", date: "2026-08-22", assignedMonth: "2026-08" },
  ],
  "los-kalibre": [
    { id: "g-lk-1", type: "otro", concept: "Pauta del single «Fuego Lento»", provider: "Agencia Pulso", description: "Pauta en Meta y TikTok", amount: 3_200_000, target: "ads", date: "2026-09-20", assignedMonth: "2026-09" },
    { id: "g-lk-2", type: "spotify", concept: "Playlist Urbano", provider: "Curaduría Andina", amount: 2_200_000, target: "ads", date: "2026-08-12", assignedMonth: "2026-08" },
  ],
  "sofia-vega": [
    { id: "g-sv-1", type: "spotify", concept: "Playlist Pop Latino", provider: "Curaduría Andina", amount: 1_600_000, target: "ads", date: "2026-09-08", assignedMonth: "2026-09" },
    { id: "g-sv-2", type: "otro", concept: "Pauta en TikTok", provider: "Agencia Pulso", amount: 1_500_000, target: "ads", date: "2026-07-15", assignedMonth: "2026-07" },
  ],
  kairo: [
    { id: "g-ka-1", type: "otro", concept: "Pauta del lanzamiento", provider: "Agencia Pulso", amount: 2_200_000, target: "ads", date: "2026-08-25", assignedMonth: "2026-08" },
  ],
  "isla-norte": [
    { id: "g-in-1", type: "spotify", concept: "Playlist Indie", provider: "Curaduría Andina", amount: 600_000, target: "ads", date: "2026-09-02", assignedMonth: "2026-09" },
  ],
  "mateo-rios": [],
};
