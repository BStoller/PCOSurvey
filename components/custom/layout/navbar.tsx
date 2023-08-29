"use client";

import Link from "next/link";
import LoginButton from "../loginButton";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function AccountAction({
  status,
}: {
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  if (status == "authenticated")
    return <Button variant={"ghost"} onClick={() => signOut()}>Log out</Button>;

  <Button
    variant={"ghost"}
    className="text-amber-500"
    onClick={() => {
      signIn("pco");
    }}
  >
    Login
  </Button>;
}

export function Navbar() {
  const session = useSession();

  useEffect(() => {}, [session]);

  return (
    <div className="bg-zinc-900">
      <div className="container flex justify-between w-full h-12 items-center">
        <div className="lg:flex space-x-8 items-center">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Get Started</Link>
        </div>
        <div className="">
            <AccountAction status={session.status}></AccountAction>
        </div>
      </div>
    </div>
  );
}
