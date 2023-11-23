import { AuthSessionProvider } from "@/components/authSessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/custom/layout/footer";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/custom/layout/navbar";
import PlausibleProvider from "next-plausible";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sunday Trends",
  description:
    "Find the true patterns of your volunteers in Planning Center with Sunday Trends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="pco-survey.vercel.app" />
      </head>
      <AuthSessionProvider>
        <body className={cn(GeistSans.className)}>
          <div className="flex h-screen w-full flex-col">
            <Navbar></Navbar>
            <main className="flex-1">{children}</main>
            <Footer></Footer>
          </div>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
