import prisma from "@/utils/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
          console.log("is correct pw: ", passwordCompare);
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
