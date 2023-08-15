import { User } from "next-auth";

declare module 'next-auth' {
    interface Session extends Session {
        accessToken : string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends JWT {
        accessToken : string;
    }
}