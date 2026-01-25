import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// FontAwesome CSS - using CDN approach for v7.x compatibility
import ConditionalHeader from "../components/ConditionalHeader";
import ConditionalFooter from "../components/ConditionalFooter";
import PerformanceMonitor from "../components/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  title: "Grace of God Mission",
  description: "Welcome to Grace of God Mission - a place of worship, community, and faith.",
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#d4af37',
  verification: {
    google: 'dfaf54a3895e75f4',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <PerformanceMonitor />
        <ConditionalHeader />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}