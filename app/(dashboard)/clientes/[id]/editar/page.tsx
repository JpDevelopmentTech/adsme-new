import type { Metadata } from "next";
import { EditClientScreen } from "../../_screens/edit-client-screen";

export const metadata: Metadata = { title: "Editar cliente · adsme" };

/** Edición de cliente al entrar por URL: la misma tarjeta del modal, centrada en la página. */
export default async function EditarClientePage({ params }: PageProps<"/clientes/[id]/editar">) {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <EditClientScreen clientId={id} isModal={false} />
    </div>
  );
}
