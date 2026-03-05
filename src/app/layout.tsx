import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
