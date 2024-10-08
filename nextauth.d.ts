import { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      avatar: string;
      accessToken: string;
    } & DefaultSession['user'];
  }
}
