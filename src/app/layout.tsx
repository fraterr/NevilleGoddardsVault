import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neville Goddard's Vault",
  description: "A comprehensive, beautifully designed vault containing the books, lectures, and radio broadcasts of Neville Goddard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={garamond.variable}>
      <body>
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
