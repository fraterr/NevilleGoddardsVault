import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
};

// Applies the persisted theme before first paint to avoid a flash
const themeInitScript = `try{var t=localStorage.getItem('ngv-theme');if(t==='sepia'){document.documentElement.dataset.theme='sepia'}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
