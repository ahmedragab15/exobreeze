import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "EXOBreeze - Breathe Better, Live Smarter",
  description: "Accurate air-quality insights powered by NASA TEMPO and local data—right when you need them.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans`}>
        {children}
        <ToastContainer position="bottom-left" autoClose={1000} />
      </body>
    </html>
  );
}
