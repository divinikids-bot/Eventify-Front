import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      birthDate?: string;
      gender?: string;
    };
  }
}
