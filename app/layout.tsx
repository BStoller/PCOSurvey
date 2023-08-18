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
        <body className={cn(inter.className, "dark")}>
          <div className="dark:text-zinc-300 text-zinc-950 flex h-screen w-full flex-col ">
            <Navbar></Navbar>
            <main className="flex-1">{children}</main>
            <Footer></Footer>
          </div>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
