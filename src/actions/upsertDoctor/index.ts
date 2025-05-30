'use server';
import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';

import { upsertDoctorDbSchema } from './schema';
export const UpsertDoctorOnDb = actionClient
  .schema(upsertDoctorDbSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      redirect('/authentication');
    }
    if (
      (
        await db
          .select()
          .from(schema.usersToClincs)
          .where(
            and(
              eq(schema.usersToClincs.clinicId, parsedInput.clinicId),
              eq(schema.usersToClincs.userId, session.user.id),
            ),
          )
      ).length <= 0
    ) {
      await auth.api.signOut({
        headers: await headers(),
      });
      redirect('/authentication');
    }
    await db
      .insert(schema.doctors)
      .values({
        id: parsedInput.id,
        ...parsedInput,
      })
      .onConflictDoUpdate({
        target: schema.doctors.id,
        set: {
          ...parsedInput,
        },
      });
  });
