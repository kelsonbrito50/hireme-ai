import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: { params: { scope: "read:user" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Capture GitHub access token + profile on first sign-in
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        const gh = profile as Record<string, unknown>;
        token.login        = gh.login        as string;
        token.bio          = gh.bio          as string | null;
        token.publicRepos  = gh.public_repos  as number;
        token.followers    = gh.followers    as number;
        token.following    = gh.following    as number;
        token.githubUrl    = gh.html_url     as string;
        token.company      = gh.company      as string | null;
        token.location     = gh.location     as string | null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id          = token.sub ?? "";
        session.user.login       = token.login       as string;
        session.user.bio         = token.bio         as string | null;
        session.user.publicRepos = token.publicRepos as number;
        session.user.followers   = token.followers   as number;
        session.user.following   = token.following   as number;
        session.user.githubUrl   = token.githubUrl   as string;
        session.user.company     = token.company     as string | null;
        session.user.location    = token.location    as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
