import type { Metadata } from "next";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { PendingScreenNotice } from "@/presentation/components/ui/pending-screen-notice";

export const metadata: Metadata = { title: "Campañas · adsme" };

export default function CampanasPage() {
  return (
    <>
      <PageHeader title="Campañas" />
      <PendingScreenNotice screen="B9 · Campañas Lista" />
    </>
  );
}
