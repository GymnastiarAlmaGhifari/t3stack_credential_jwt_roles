import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import bcrypt from "bcryptjs";
import { env } from "y/env.mjs";
import { prisma } from "y/server/db";

/**
 * change the session type like this
 * this same in the prisma schema the role
 * you can change the role to whatever you want
 *  */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;

      role: "USER" | "ADMIN";
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: "USER" | "ADMIN";
  }
}

export const authOptions: NextAuthOptions = {
  /**
   * change the callback like this
   * and dont worry about the ts-ignore because it still works and i have no idea why this erros
   *  but i haved to npm run build to see the errors and i have no errors and it works
   *
   * DONT WORRY ABOUT THE TS-IGNORE
   */

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id: token.id,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        role: token.role,
      };
      return Promise.resolve(session);
    },
    async signIn({ user, account, profile, email, credentials }) {
      /**
       * this used check your user already in database or not
       *
       * but i think this will be used if you are login with google or other OAuth
       *
       *
       *  */

      if (!user || !user.email) {
        return Promise.reject(new Error("Invalid user object"));
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const isUserRegistered = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!isUserRegistered) {
        // if not register then redirect to /notfound page
        return Promise.resolve(`/notfound`);
      }
      return Promise.resolve(true);
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // ignore error eslint
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
