'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/db';
import { appoitments } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';

export const deleteAppoitment = actionClient
  .schema(
    z.object({
      appoitmentId: z.string().uuid().min(1),
      clinicId: z.string().uuid().min(1),
    }),
  )
  .action(async ({ parsedInput }) => {
    if (!(await sessionAndClinicsVerifier(parsedInput.clinicId))) {
      redirect('/authentication');
    }
    await db
      .delete(appoitments)
      .where(
        and(
          eq(appoitments.id, parsedInput.appoitmentId),
          eq(appoitments.clinicId, parsedInput.clinicId),
        ),
      );
    revalidatePath('/appoitments/' + parsedInput.clinicId);
  });
