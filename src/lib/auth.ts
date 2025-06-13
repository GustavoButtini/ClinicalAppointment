import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { customSession } from 'better-auth/plugins'; // Add this import or adjust the path as needed
import { eq } from 'drizzle-orm';

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
  plugins: [
    customSession(async ({ user, session }) => {
      const userPhone = await db
        .select({ phone: schema.users.phone, plan: schema.users.plan })
        .from(schema.users)
        .where(eq(schema.users.id, user.id));

      const userclinics = await db.query.usersToClincs.findMany({
        where: eq(schema.usersToClincs.userId, user.id),
        with: {
          clinic: true,
        },
      });
      const clinics = userclinics.map((data) => {
        return data.clinic;
      });
      return {
        user: {
          ...user,
          phone: userPhone[0].phone ?? '',
          plan: userPhone[0].plan ?? null,
          clinics: clinics,
        },
        session,
      };
    }),
  ],
});
