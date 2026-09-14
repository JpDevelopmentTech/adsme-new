import type { Metadata } from "next";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { PendingScreenNotice } from "@/presentation/components/ui/pending-screen-notice";

export const metadata: Metadata = { title: "Ajustes · adsme" };

export default function AjustesPage() {
  return (
    <>
      <PageHeader title="Ajustes" />
      <PendingScreenNotice screen="B14 · Perfil y preferencias" />
    </>
  );
}
