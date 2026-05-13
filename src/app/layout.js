import { Geist } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
import MarketingScriptsManager from "@/components/MarketingScriptsManager";
import PopupManager from "@/components/PopupManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// ─── Datos del negocio (úsalos también en Schema.org) ─────────────────────────
const BRAND_NAME = "Mundo Asiático";
const DOMAIN = "https://mundoasiatico.cl";
const TAGLINE = "Repuestos para Autos Chinos en Chile";
const DESCRIPTION =
  "Especialistas en repuestos originales y alternativos para vehículos de marcas chinas: Chery, MG, JAC, Great Wall, BYD y más. Despacho a todo Chile. Sucursales en Santiago y Puerto Montt.";

// ─── Metadata Global ──────────────────────────────────────────────────────────
export const metadata = {
  // ── Basics ─────────────────────────────────────────────────────────────────
  title: {
    default: `${BRAND_NAME} | ${TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "repuestos autos chinos Chile",
    "repuestos Chery Chile",
    "repuestos MG Chile",
    "repuestos JAC Chile",
    "repuestos Great Wall Chile",
    "repuestos BYD Chile",
    "repuestos DFSK Chile",
    "repuestos BAIC Chile",
    "repuestos Haval Chile",
    "repuestos autos asiáticos",
    "repuestos Santiago Chile",
    "repuestos Puerto Montt",
    "accesorios autos chinos",
    "filtros aceite Chery",
    "correa distribución MG",
    "frenos JAC",
    "repuestos importados Chile",
    "tienda repuestos online Chile",
  ],
  authors: [{ name: BRAND_NAME, url: DOMAIN }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,

  // ── Canonical ──────────────────────────────────────────────────────────────
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": DOMAIN,
    },
  },

  // ── Open Graph (Facebook, WhatsApp, LinkedIn) ──────────────────────────────
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: DOMAIN,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: `${DOMAIN}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} — Repuestos para Autos Chinos en Chile`,
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | ${TAGLINE}`,
    description: DESCRIPTION,
    images: [`${DOMAIN}/og-image.jpg`],
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ───────────────────────────────────────────────────────────
  // Agrega tu código de Google Search Console aquí cuando lo tengas
  // verification: {
  //   google: "TU_CODIGO_AQUI",
  // },

  // ── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Manifest ───────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",
};

// ─── Schema.org Local Business (JSON-LD) ─────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": `${DOMAIN}/#organization`,
  name: BRAND_NAME,
  url: DOMAIN,
  logo: {
    "@type": "ImageObject",
    url: `${DOMAIN}/logo-mundo-asiatico.webp`,
  },
  description: DESCRIPTION,
  foundingDate: "2020",
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  currenciesAccepted: "CLP",
  paymentAccepted: "Tarjeta de crédito, Débito, Transferencia bancaria",
  priceRange: "$$",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+56-9-XXXXXXXX",
    contactType: "Atención al cliente",
    availableLanguage: "Spanish",
    areaServed: "CL",
  },
  sameAs: [
    "https://www.instagram.com/mundoasiatico",
    "https://www.facebook.com/mundoasiatico",
  ],
  location: [
    {
      "@type": "AutoPartsStore",
      name: "Mundo Asiático — Santiago",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -33.4489,
        longitude: -70.6693,
      },
    },
    {
      "@type": "AutoPartsStore",
      name: "Mundo Asiático — Puerto Montt",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puerto Montt",
        addressRegion: "Los Lagos",
        addressCountry: "CL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -41.4717,
        longitude: -72.9366,
      },
    },
  ],
};

// ─── Schema.org WebSite (SearchAction para el buscador interno) ───────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  url: DOMAIN,
  name: BRAND_NAME,
  description: DESCRIPTION,
  inLanguage: "es-CL",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${DOMAIN}/catalogo?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Preconnect para rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} antialiased`} suppressHydrationWarning={true}>
        <MarketingScriptsManager />
        <ShopProvider>
          <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <CartDrawer />
            <WhatsAppButton />
            <CookieBanner />
            <PopupManager />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}
