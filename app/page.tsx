export const runtime = "edge";

import LoginButton from "@/components/custom/loginButton";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <LoginButton></LoginButton>
    </div>
  );
}
