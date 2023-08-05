"use client";

import { Session } from "next-auth";
import { SessionContext, SessionProvider } from "next-auth/react";

export function AuthSessionProvider({children} : {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}