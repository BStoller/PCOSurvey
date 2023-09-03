import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

export async function  pcoFetch(url : string, opts? : {callbackUrl? : string, options?: NextFetchRequestConfig}) {

    const {callbackUrl = "/", options} = opts ?? {};

    const user = await getServerSession(authOptions);

    const req = await fetch(url, {
        headers : {
            Authorization: `Bearer ${user?.accessToken}`,
        },
        next: options
    });

    if(req.status != 200) {
        redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`)
    }

    return req;
}