import type { Metadata } from "next";
import { NewClientScreen } from "../_screens/new-client-screen";

export const metadata: Metadata = { title: "Nuevo cliente · adsme" };

/** Alta de cliente al entrar por URL: la misma tarjeta del modal, centrada en la página. */
export default function NuevoClientePage() {
  return (
    <div className="flex justify-center">
      <NewClientScreen isModal={false} />
    </div>
  );
}
