import type { Metadata, Viewport } from "next";

/* Yazı tipleri npm'den self-host ediliyor (Google Fonts'a build-time bağımlılık yok).
   Aileler tema.css içinde --yazi-govde / --yazi-mono olarak atanıyor. */
import "@fontsource-variable/archivo/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrum + AI İç Eğitimi",
  description: "İki oturumluk canlı eğitim. Slaytlar sunucuyla senkron akar.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0A0C0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body data-oturum="1">{children}</body>
    </html>
  );
}
