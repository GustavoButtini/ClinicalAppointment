'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';

import { db } from '@/db';
import { clinics } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';
import { actionClient } from '@/lib/safe-action';
const updateClinicSchema = z.object({
  id: z.string().uuid().min(1, { message: 'You need an UUID !' }),
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});
export const updateClinicAction = actionClient
  .schema(updateClinicSchema)
  .action(async ({ parsedInput }) => {
    if (!(await sessionAndClinicsVerifier(parsedInput.id))) {
      redirect('/authentication');
    }
    await db
      .update(clinics)
      .set({
        name: parsedInput?.name,
        address: parsedInput?.address,
        phone: parsedInput?.phone,
      })
      .where(eq(clinics.id, parsedInput.id));
    revalidatePath('/clinic/update');
  });
