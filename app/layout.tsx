import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kichu & Dathan — A Sacred Union",
  description:
    "Join us in celebrating the sacred wedding of Aswani (Kichu) & Dathan on 14th February 2027 at Gokulam Convention Centre, Ernakulam, Kerala.",
  keywords: ["wedding", "Kerala wedding", "Kichu", "Dathan", "Ernakulam", "invitation"],
  openGraph: {
    title: "Kichu & Dathan — A Sacred Union",
    description: "You're invited to witness a beautiful Kerala wedding on Valentine's Day 2027.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#7A1F2B" />
      </head>
      <body>{children}</body>
    </html>
  );
}
