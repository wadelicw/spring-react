import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/utils/prisma';
import { signJwtAccessToken } from '@/utils/jwt';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });
          if (user) {
            const {
              password, id, email, role,
            } = user;
            const passwordCompare = await compare(credentials?.password || '', password);
            if (passwordCompare) {
              const sub = email;
              const accessToken = signJwtAccessToken({
                id, email, sub,
              });
              return {
                id, email, accessToken, role, sub,
              };
            }
          }
          return null;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
