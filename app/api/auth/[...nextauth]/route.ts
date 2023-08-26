import NextAuth, { AuthOptions, User } from "next-auth";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "pco",
      name: "PlanningCenter",
      type: "oauth",
      token: "https://api.planningcenteronline.com/oauth/token",
      authorization: {
        params: { scope: "services people" },
        url: "https://api.planningcenteronline.com/oauth/authorize",
      },
      userinfo: "https://api.planningcenteronline.com/people/v2/me",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET,
      profile(
        profile: {
          data: {
            id: string;
            attributes: { first_name: string; last_name: string };
          };
          meta: {
            parent : {
              id : string
            }
          }
        },
        tokens
      ) {
        return {
          id: profile.data.id,
          name: `${profile.data.attributes.first_name} ${profile.data.attributes.last_name}`,
        } as User;
      },
    },
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;

      return session;
    },
    async jwt({ account, token }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.expiresAt = new Date(account.expires_at! * 1000);
        token.refreshToken = account.refresh_token!;
      }

      if (new Date() >= token.expiresAt) {
        try {
          const req = await fetch(
            "https://api.planningcenteronline.com/oauth/token",
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.SECRET,
                refresh_token: token.refreshToken,
                grant_type: "refresh_token",
              }),
            }
          );

          const data = (await req.json()) as {access_token : string, expires_in : number, created_at : number, refresh_token : string};

          token.accessToken = data.access_token;
          token.expiresAt = new Date((data.created_at + data.expires_in) * 1000);
        } catch (er) {
          console.error(er);
        }
      }

      return token;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
