import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from "js-cookie";
import axios from "axios";

interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AppToken {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "admin"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
            image:
              "https://media.discordapp.net/attachments/1366615074017513582/1369231594103115786/imgPlaceholder.png",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const u = user as AppUser;
      if (u) {
        (token as AppToken).id = u.id;
        (token as AppToken).image = u.image;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as AppToken;
      session.user.id = t.id!;
      session.user.image = t.image;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };