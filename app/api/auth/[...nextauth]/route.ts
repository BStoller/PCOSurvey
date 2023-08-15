import { Session } from "inspector";
import NextAuth, { AuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions : AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "pco",
      name: "PlanningCenter",
      type: "oauth",
      token: "https://api.planningcenteronline.com/oauth/token",
      authorization: {params: {scope: "services people"}, url: "https://api.planningcenteronline.com/oauth/authorize"},
      userinfo: "https://api.planningcenteronline.com/people/v2/me",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET,
      profile(profile : {data: {id : string, attributes: {first_name : string, last_name: string}}}, tokens) {
        return {id: profile.data.id,
            name: `${profile.data.attributes.first_name} ${profile.data.attributes.last_name}`,
        } as User
      },
    },
  ],
  callbacks: {
    async session({session, token, user}){

      session.accessToken = token.accessToken;

      return session;
    },
    async jwt({account, token}){
        if(account)
          token.accessToken = account.access_token!;
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET ?? "DEVSECRET"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
