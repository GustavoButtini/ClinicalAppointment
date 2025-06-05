'use server';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';

import { upsertPatientDbSchema } from './schema';

export const UpsertPatientOnDb = actionClient
  .schema(upsertPatientDbSchema)
  .action(async ({ parsedInput }) => {
    if (!(await sessionAndClinicsVerifier(parsedInput.clinicId))) {
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
