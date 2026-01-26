import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mundo Asiático | Repuestos Chinos",
  description: "Especialistas en repuestos para vehículos de marcas chinas. Chery, MG, JAC, Great Wall y más.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ShopProvider>
          <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <CartDrawer />
            <WhatsAppButton />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}
