import NextAuth, { AuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions : AuthOptions = {
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
      profile(profile : {data: {id : string, attributes: {first_name : string, last_name: string}}}) {
        return {id: profile.data.id,
            name: `${profile.data.attributes.first_name} ${profile.data.attributes.last_name}`,
        } as User
      },
    },
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
