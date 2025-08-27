import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aujournuitRegular = localFont({
  src: "../public/fonts/Aujournuit-Regular.woff2",
  display: "swap",
  variable: "--font-aujournuit-regular",
});

export const metadata: Metadata = {
  title: "The Infinite Library",
  description: "Every Author in Relation to All Others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={aujournuitRegular.className}>{children}</body>
    </html>
  );
}
