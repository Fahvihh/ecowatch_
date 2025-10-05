"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="pt-BR">
      <head>
        <script src="https://unpkg.com/three@0.150.1/build/three.min.js" />
        <script src="https://unpkg.com/globe.gl@2.30.0/dist/globe.gl.min.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{background: '#061826'}}>
        {/* Header Navigation - visível em todas as páginas */}
        <header style={{
          width: '100%',
          background: 'rgba(10,30,50,0.85)',
          borderBottom: '1.5px solid #2fffd6',
          boxShadow: '0 2px 16px #00ffe033',
          padding: '0.5em 0',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000
        }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            fontSize: '1.15em',
            fontWeight: 500
          }}>
            <a href="/" style={{
              color: pathname === "/" ? '#101c2c' : '#2fffd6',
              background: pathname === "/" ? '#2fffd6' : 'transparent',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              transition: 'background 0.2s',
              fontWeight: pathname === "/" ? 700 : 500,
              boxShadow: pathname === "/" ? '0 0 8px #2fffd6' : 'none'
            }}>Home</a>
            <a href="/quem-somos" style={{
              color: pathname === "/quem-somos" ? '#101c2c' : '#eafcff',
              background: pathname === "/quem-somos" ? '#2fffd6' : 'transparent',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              transition: 'background 0.2s',
              fontWeight: pathname === "/quem-somos" ? 700 : 500,
              boxShadow: pathname === "/quem-somos" ? '0 0 8px #2fffd6' : 'none'
            }}>Quem Somos</a>
          </nav>
        </header>
        <div style={{paddingTop: '80px'}}>
          {children}
        </div>
      </body>
    </html>
  );
}
