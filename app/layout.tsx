import { AuthSessionProvider } from "@/components/authSessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/custom/layout/footer";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/custom/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCO Survey",
  description:
    "Find the true patterns of your volunteers in Planning Center with PCO Survey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body className={cn(inter.className, "flex h-screen w-full flex-col text-zinc-950 dark:text-zinc-300 from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 bg-gradient-to-br")}>
          <Navbar></Navbar>
          <main className="flex-1">{children}</main>
          <Footer></Footer>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
