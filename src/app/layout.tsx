import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohayu | US Test Page",
  description: "Test page for US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
