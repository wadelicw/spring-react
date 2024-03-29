import { signJwtAccessToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      async authorize(credentials): Promise<any> {
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
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      /* eslint-disable  no-param-reassign */
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
