import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Geist, Geist_Mono } from "next/font/google";
// providers
import { AppProviders } from '@/providers';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

  export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <AppProviders>{props.children}</AppProviders>
      </body>
    </html>
  );
}
