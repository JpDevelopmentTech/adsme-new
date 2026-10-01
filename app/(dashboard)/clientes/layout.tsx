import type { ReactNode } from "react";

/**
 * Sección Clientes: la pantalla en curso y, encima, la ranura `@modal`, donde se
 * abren el alta y la edición interceptadas sin salir de la lista ni de la ficha.
 */
export default function ClientesLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
