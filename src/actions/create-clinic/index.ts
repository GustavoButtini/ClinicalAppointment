'use server';

import { headers } from 'next/headers';

import { db } from '@/db';
import { clinics, usersToClincs } from '@/db/schema';
import { UnathorizedError } from '@/errors/unathorizedError';
import { auth } from '@/lib/auth';

type clinicParams = { name: string; address: string; phone: string };
export const createClinic = async (data: clinicParams) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new UnathorizedError('You need to logon to make this action !');
  }
  const [clinic] = await db
    .insert(clinics)
    .values({ name: data.name, address: data.address, phone: data.phone })
    .returning();
  const relation = await db.insert(usersToClincs).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  if (relation === null || relation === undefined) {
    throw new Error('The server couldn´t handle your request, please await !');
  }
};
