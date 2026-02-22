import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login?: string;
      bio?: string | null;
      publicRepos?: number;
      followers?: number;
      following?: number;
      githubUrl?: string;
      company?: string | null;
      location?: string | null;
    };
  }
}
