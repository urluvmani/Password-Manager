import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Script from "next/script";

// ✅ Remove next/head import (not needed in app directory)

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata will auto add favicon if using default name (favicon.ico)
export const metadata = {
  title: "PassOP - Mani Passwords manager",
  description: "You can save your password there without any fear.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add your custom favicon here */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* ✅ Lordicon script */}
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
