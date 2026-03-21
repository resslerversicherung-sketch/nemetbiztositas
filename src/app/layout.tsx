import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Német Biztosítás 24 | NB24",
  description: "Versicherungsdienstleister für in Deutschland lebende Ungarn und Rumänen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
