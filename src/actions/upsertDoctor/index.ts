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
    dayjs.extend(utc);
    const available_from_time_utc = dayjs()
      .hour(parseInt(parsedInput.availableFromTime.split(':')[0]))
      .minute(parseInt(parsedInput.availableFromTime.split(':')[1]))
      .second(parseInt(parsedInput.availableFromTime.split(':')[2]))
      .utc();
    console.log(parsedInput.availableFromTime);
    console.log(available_from_time_utc);
    const available_to_time_utc = dayjs()
      .set('hour', parseInt(parsedInput.availableToTime.split(':')[0]))
      .set('minute', parseInt(parsedInput.availableToTime.split(':')[1]))
      .set('second', parseInt(parsedInput.availableToTime.split(':')[2]))
      .utc();

    await db
      .insert(schema.doctors)
      .values({
        id: parsedInput.id,
        ...parsedInput,
        availableFromTime: available_from_time_utc.format('HH:mm:ss'),
        availableToTime: available_to_time_utc.format('HH:mm:ss'),
      })
      .onConflictDoUpdate({
        target: schema.doctors.id,
        set: {
          ...parsedInput,
          availableFromTime: available_from_time_utc.format('HH:mm:ss'),
          availableToTime: available_to_time_utc.format('HH:mm:ss'),
        },
      });
    revalidatePath('/doctors/' + parsedInput.clinicId);
  });
