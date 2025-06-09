import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { clinics, usersToClincs } from '@/db/schema';
import { auth } from '@/lib/auth';

export const GET = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect('/authentication');
  }
  const userClinics = await db
    .select({ id: clinics.id, name: clinics.name })
    .from(usersToClincs)
    .leftJoin(clinics, eq(usersToClincs.clinicId, clinics.id))
    .where(eq(usersToClincs.userId, session.user.id));
  return NextResponse.json(userClinics);
};
