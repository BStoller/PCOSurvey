import { AuthSessionProvider } from "@/components/authSessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <body className={inter.className}>
          <div className="flex h-screen w-full">
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
