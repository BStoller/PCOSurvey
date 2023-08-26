"use client";

import Link from "next/link";
import LoginButton from "../loginButton";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="bg-zinc-800 py-2 shadow-lg">
      <div className="container flex justify-between w-full items-center">
        <div className="lg:flex space-x-8">
          <Link href="">Home</Link>
          <Link href="">Get Started</Link>
        </div>
        <div className="">
            <AccountAction status={session.status}></AccountAction>
        </div>
      </div>
    </div>
  );
}
