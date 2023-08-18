"use client";

import Link from "next/link";
import LoginButton from "../loginButton";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function AccountButton({
  status,
}: {
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  if (status == "authenticated")
    return <Button onClick={() => signOut()}>Log out</Button>;

  <Button
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
    <div className="dark:bg-zinc-800 py-4 border-b border-zinc-100 dark:border-0 shadow-md">
      <div className="container flex justify-between w-full items-center">
        <div className="lg:flex space-x-8">
          <Link href="">Home</Link>
          <Link href="">About</Link>
          <Link href="">Portal</Link>
        </div>
        <div className="">
            <AccountButton status={session.status}></AccountButton>
        </div>
      </div>
    </div>
  );
}
