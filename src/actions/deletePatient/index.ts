'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/db';
import { patients } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';

export const DeletePatient = actionClient
  .schema(
    z.object({
      patId: z.string().uuid().min(1),
      clinicId: z.string().uuid().min(1),
    }),
  )
  .action(async ({ parsedInput }) => {
    if (!(await sessionAndClinicsVerifier(parsedInput.clinicId))) {
      redirect('/authentication');
    }
    await db
      .delete(patients)
      .where(
        and(
          eq(patients.id, parsedInput.patId),
          eq(patients.clinicId, parsedInput.clinicId),
        ),
      );
    revalidatePath('/doctors/' + parsedInput.clinicId);
  });
