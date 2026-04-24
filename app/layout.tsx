import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Groupe Scolaire Privé Ephrata — École maternelle et primaire à Abidjan",
  description:
    "Groupe Scolaire Privé Ephrata — Une école maternelle et primaire d’excellence à Abidjan, Côte d’Ivoire, alliant joie, créativité et rigueur académique.",
  keywords: ["école maternelle", "école primaire", "Ephrata", "GSPE", "éducation", "Abidjan", "Côte d'Ivoire"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${baloo2.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
