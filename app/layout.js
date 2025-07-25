import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PassOP - Mani Passwords manager",
  description: "You can save your password there without any fear.",
  icons: {
    icon: "/favicon.png", // ✅ This replaces <link rel="icon" />
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Lordicon script placed correctly inside body */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />

        <Navbar />
        {children}
      </body>
    </html>
  );
}
