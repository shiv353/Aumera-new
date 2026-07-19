import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Aumera Gifts",
  description: "Luxury gifting curated with love.",
  icons: {
    icon: "/aumera-submark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}