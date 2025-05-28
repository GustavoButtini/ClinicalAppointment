import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { usersToClincs } from '@/db/schema';
import { auth } from '@/lib/auth';

import QuitButton from './components/QuitButton';
import RedirectNotLogged from './components/RedirectNotLogged';

const DashBoardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return <RedirectNotLogged />;
  }
  const userCreatedClinics = await db.query.usersToClincs.findMany({
    where: eq(usersToClincs.userId, session.user.id),
  });
  if (userCreatedClinics.length <= 0) {
    redirect('/clinic-create');
  }
  return (
    <div>
      <h1>Hello {session?.user.name} !</h1>
      <QuitButton />
    </div>
  );
};

export default DashBoardPage;
