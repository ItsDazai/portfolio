import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Avatar from "./page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'], // Or any other subsets you need
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Specify all the weights you will use
});

export const metadata = {
  title: "Afzal Parwez",
  description: "Portfolio of Afzal Parwez",
  icons: "icons.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
