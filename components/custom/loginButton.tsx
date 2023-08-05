"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginButton() {

    const session = useSession();

    return (
        <Button onClick={() => {signIn('pco')}}>Login</Button>
    )
}