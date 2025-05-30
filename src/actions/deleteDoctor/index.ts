'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/db';
import { doctors, usersToClincs } from '@/db/schema';
import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';

export const DeleteDoctor = actionClient
  .schema(
    z.object({
      docId: z.string().uuid().min(1),
      clinicId: z.string().uuid().min(1),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      redirect('/authentication');
    }
    if (
      (
        await db
          .select()
          .from(usersToClincs)
          .where(
            and(
              eq(usersToClincs.userId, session.user.id),
              eq(usersToClincs.clinicId, parsedInput.clinicId),
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
      .delete(doctors)
      .where(
        and(
          eq(doctors.id, parsedInput.docId),
          eq(doctors.clinicId, parsedInput.clinicId),
        ),
      );
    revalidatePath('/doctors/' + parsedInput.clinicId);
  });
