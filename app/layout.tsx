import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Poppins no es variable: hay que declarar los pesos que se usan. El sistema
// se apoya en 200 (cifras y titulares), 300 y 400; 500 marca lo enfático y 600
// solo sobrevive para las pantallas que todavía no se han migrado.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "adsme",
  description:
    "El marketing de tu marca, medido en tiempo real. Gestiona campañas de YouTube, Meta y TikTok Ads desde un solo lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="bg-ambient text-text-primary flex min-h-full flex-col font-light">
        {children}
      </body>
    </html>
  );
}
