import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { StudentSessionProvider } from "@/components/student-session";
import "./globals.css";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Profe Ale | Espanhol para Criancas",
  description:
    "Plataforma online de espanhol para criancas com aulas curtas, atividades ludicas e painel para familias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <StudentSessionProvider>{children}</StudentSessionProvider>
      </body>
    </html>
  );
}
