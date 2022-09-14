import { PrismaAdapter } from "@next-auth/prisma-adapter";
import argon2 from "argon2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/database/client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: Record<"email" | "password", string>, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const validPassword = await argon2.verify(
          user.password,
          credentials.password
        );

        if (!validPassword) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
});
