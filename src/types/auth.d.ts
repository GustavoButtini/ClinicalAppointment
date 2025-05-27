import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      phone: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    phone: string;
  }
}
