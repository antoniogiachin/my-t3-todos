import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

import CredentialsProvider from "next-auth/providers/credentials";
import { comparePasswords } from "../../../server/common/pwdSecurityHandler";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("All Fields Required!");
        }

        const findUserByEmail = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!findUserByEmail) {
          throw new Error("No user with given email found!");
        }

        const comparePassword = await comparePasswords(
          credentials?.password,
          findUserByEmail.password
        );

        if (!comparePassword) {
          throw new Error("Wrong password given!");
        }

        return findUserByEmail;
      },
    }),
  ],
};

export default NextAuth(authOptions);
