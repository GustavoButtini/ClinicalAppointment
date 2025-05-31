'use server';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';

import { upsertPatientDbSchema } from './schema';

export const UpsertPatientOnDb = actionClient
  .schema(upsertPatientDbSchema)
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

    dayjs.extend(utc);
    const dateOfBirthUtc = dayjs(parsedInput.dateOfBirth).utc();

    await db
      .insert(schema.patients)
      .values({
        id: parsedInput.id,
        name: parsedInput.name,
        email: parsedInput.email,
        phone: parsedInput.phone,
        sex: parsedInput.sex,
        dateOfBirth: dateOfBirthUtc.toDate(),
        clinicId: parsedInput.clinicId,
      })
      .onConflictDoUpdate({
        target: schema.patients.id,
        set: {
          name: parsedInput.name,
          email: parsedInput.email,
          phone: parsedInput.phone,
          sex: parsedInput.sex,
          dateOfBirth: dateOfBirthUtc.toDate(),
          clinicId: parsedInput.clinicId,
        },
      });

    revalidatePath('/patients/' + parsedInput.clinicId);
  });
