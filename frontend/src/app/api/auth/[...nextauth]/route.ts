import prisma from "@/utils/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req): Promise<any> {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          const passwordCompare = await compare(credentials?.password || "", user.password);
          if (passwordCompare) {
            return {
              id: user.id,
              email: user.email,
            };
          }
        }
        return null
      }
    })
  ]
});

export { handler as GET, handler as POST };
