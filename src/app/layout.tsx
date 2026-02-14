import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "ZKAP Design System",
  description: "Foundation tokens and guidelines for ZKAP products",
  icons: {
    icon: "/design-foundation/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${geist.variable} antialiased`} style={{ fontFamily: 'var(--font-base)', backgroundColor: 'var(--bg-primary)' }}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
