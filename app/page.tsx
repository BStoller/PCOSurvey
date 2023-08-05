export const runtime = 'edge';

import LoginButton from "@/components/custom/loginButton";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <LoginButton></LoginButton>
      </div>
    </main>
  )
}
