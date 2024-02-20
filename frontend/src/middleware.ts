export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/profile', '/search', '/checkout', '/checkout/(.*)', '/shelf', '/admin', '/message',
  ],
};
