import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export async function  pcoFetch(url : string, options?: NextFetchRequestConfig) {
    const user = await getServerSession(authOptions);

    const req = await fetch(url, {
        headers : {
            Authorization: `Bearer ${user?.accessToken}`,
        },
        next: options
    });

    if(req.status != 200) {
        signIn('pco');
    }

    return req;
}