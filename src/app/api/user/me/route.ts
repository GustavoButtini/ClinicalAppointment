// src/app/api/user/me/route.ts
import { NextResponse } from 'next/server';

import { sessionVerifier } from '@/helpers/sessionVerifier';
import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!(await sessionVerifier()) || session?.user == null) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(session.user);
}
