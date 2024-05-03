import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db_client } from "@repo/database";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db_client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials, req) {
        if (req.method === "POST") {
          const { email, password } = credentials;
          try {
            const user = await db_client.user.findFirst({
              where: { email, password },
            });

            if (!user) return null;

            return user;
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: token.id,
          email: token.email,
          name: token.name,
          email_verified: token.email_verified,
          roles: token.roles,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          email_verified: token.email_verified,
          roles: token.roles,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt", // JSON Web Token
  },
  secret: "SUPER_SECRET", //process.env.NEXTAUTH_SECRET,
};

export const hasSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No auth session");
  }
  return session;
};
