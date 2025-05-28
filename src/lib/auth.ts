import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '../db';
import * as schema from '../db/schema';
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  user: {
    fields: {
      id: 'id',
      name: 'name',
      email: 'email',
      password: 'password',
      phone: 'phone',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    additionalFields: {
      phone: {
        type: 'string',
        required: true,
        defaultValue: '',
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_KEY as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    },
  },
});
