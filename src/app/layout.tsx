import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "../context/StoreContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";
import { QuickViewModal } from "../components/QuickViewModal";
import { SizeGuideModal } from "../components/SizeGuideModal";
import { ToastContainer } from "../components/ToastContainer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FashionAura - Contemporary Minimalist Apparel & Atelier",
  description: "Curated collection of architectural silhouettes, organic selvedge denim, and sustainable luxury essentials.",
  openGraph: {
    title: "FashionAura - Contemporary Minimalist Apparel & Atelier",
    description: "Curated collection of architectural silhouettes, organic selvedge denim, and sustainable luxury essentials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col min-h-screen selection:bg-neutral-900 selection:text-white`}
      >
        <StoreProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <SizeGuideModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
