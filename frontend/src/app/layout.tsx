import { ImportBsJS } from "@/components/ImportBsJS";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "./_components/Footer";
import { NavBar } from "./_components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fullstack Demo Project",
  description: "Wade's spingboot-react fullstackdemo project",
};

export default async function RootLayout({
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
