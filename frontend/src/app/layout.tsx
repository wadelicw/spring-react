import { Footer } from "@/components/Footer";
import { ImportBsJS } from "@/components/ImportBsJS";
import { NavBar } from "@/components/NavBar";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fullstack Demo Project",
  description: "Wade's spingboot-react fullstackdemo project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImportBsJS />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
