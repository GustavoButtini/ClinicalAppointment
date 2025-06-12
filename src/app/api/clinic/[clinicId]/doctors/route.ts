import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { doctors } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ clinicId: string }> },
) => {
  const { clinicId } = await params;
  if (!(await sessionAndClinicsVerifier(clinicId))) {
    return NextResponse.error();
  }
  const data = await db
    .select()
    .from(doctors)
    .where(eq(doctors.clinicId, clinicId));
  return NextResponse.json(data);
};
