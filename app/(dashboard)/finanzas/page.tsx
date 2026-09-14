import type { Metadata } from "next";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { PendingScreenNotice } from "@/presentation/components/ui/pending-screen-notice";

export const metadata: Metadata = { title: "Finanzas · adsme" };

export default function FinanzasPage() {
  return (
    <>
      <PageHeader title="Finanzas" />
      <PendingScreenNotice screen="Fase 2 del roadmap" />
    </>
  );
}
