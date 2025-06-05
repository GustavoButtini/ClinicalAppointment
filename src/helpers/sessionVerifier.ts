import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';

import { db } from '@/db';
import { usersToClincs } from '@/db/schema';
import { auth } from '@/lib/auth';
let session: { user: { id: string } } | null;
export const sessionVerifier = async () => {
  session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return false;
  }
  return true;
};

export const sessionAndClinicsVerifier = async (clinicId: string) => {
  const isSession = await sessionVerifier();
  if (isSession && session) {
    if (
      (await db
        .select()
        .from(usersToClincs)
        .where(
          and(
            eq(usersToClincs.userId, session.user.id),
            eq(usersToClincs.clinicId, clinicId),
          ),
        )) === undefined ||
      null
    ) {
      throw new Error(
        'The logged user is trying to make an cache of other clinic that do not belong to him !',
      );
    }
    return true;
  }
};
