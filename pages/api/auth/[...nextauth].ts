import NextAuth, { NextAuthOptions } from "next-auth";
// ! import {PrismaAdapter} from 'next-auth/prisma-adapter' https://next-auth.js.org/adapters/prisma  DA VALUTARE
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@lib/prisma";
import { comparePasswords } from "@lib/server/pwdSecurityHandler";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // ? adapter: PrismaAdapter
  providers: [
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
