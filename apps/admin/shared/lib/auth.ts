import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db_client, User } from "@repo/database";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useFetch } from "../api/apiFetch";

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
            const { isOk, data } = await useFetch({
              path: `${process.env.BACKEND_URL}/auth/sign-in`,
              method: "POST",
              body: { email, password },
            });

            console.log({ data });

            if (!isOk) return null;

            return data;
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
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const { email, name, id, created_at, email_verified, roles } =
        token as User;
      return {
        ...session,
        user: {
          ...session.user,
          email,
          name,
          id,
          created_at,
          email_verified,
          roles,
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
  return session;
};
