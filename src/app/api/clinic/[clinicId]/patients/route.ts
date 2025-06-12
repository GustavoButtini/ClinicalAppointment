import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { patients } from '@/db/schema';
import { sessionAndClinicsVerifier } from '@/helpers/sessionVerifier';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ clinicId: string }> },
) => {
  const { clinicId } = await params;
  if (!(await sessionAndClinicsVerifier(clinicId))) {
    throw new Error('The user isn´t logged !');
  }

  const data = await db
    .select()
    .from(patients)
    .where(eq(patients.clinicId, clinicId));
  return NextResponse.json(data);
};
