'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';

import { upsertAppoitmentSchema } from './schema';

export const createAppointment = actionClient
  .schema(upsertAppoitmentSchema)
  .action(async ({ parsedInput }) => {
    if (!(await sessionAndClinicsVerifier(parsedInput.clinicId))) {
      redirect('/authentication');
    }
    await db
      .insert(schema.appoitments)
      .values({
        ...parsedInput,
        date: new Date(parsedInput.date),
      })
      .onConflictDoUpdate({
        target: schema.appoitments.id,
        set: {
          ...parsedInput,
          date: new Date(parsedInput.date),
        },
      });
    revalidatePath('appoitments/' + parsedInput.clinicId);
  });
