"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function AccountAction({
  status,
}: {
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  if (status == "authenticated")
    return <Button variant={"ghost"} className="text-gray-600" onClick={() => signOut()}>Log out</Button>;

  return <Button
    variant={"ghost"}
    className="text-amber-700"
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
    <div className="bg-gray-200">
      <div className="container flex justify-between w-full h-12 items-center">
        <div className="lg:flex space-x-8 items-center text-gray-600">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Get Started</Link>
        </div>
        <div>
            <AccountAction status={session.status}></AccountAction>
        </div>
      </div>
    </div>
  );
}
