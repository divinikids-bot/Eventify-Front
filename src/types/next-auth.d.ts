import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // <-- penting
      name?: string;
      email?: string;
      image?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      birthDate?: string;
      gender?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
    // custom token fields
  }
}
