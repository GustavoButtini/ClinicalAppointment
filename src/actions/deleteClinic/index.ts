'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/db';
import { clinics } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';

export const deleteClinicAction = actionClient
  .schema(
    z.object({
      id: z.string().uuid().min(1, { message: 'You need an clini ID' }),
    }),
  )
  .action(async ({ parsedInput }) => {
    const clinic = parsedInput.id;
    if (!(await sessionAndClinicsVerifier(clinic))) {
      redirect('/authentication');
    }

    await db.delete(clinics).where(eq(clinics.id, clinic));
    revalidatePath('/clinic/delete');
  });
