import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PerformanceMonitor from "../components/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  title: "Grace of God Church",
  description: "Welcome to Grace of God Church - a place of worship, community, and faith.",
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#d4af37',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
