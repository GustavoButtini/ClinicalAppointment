import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

import QuitButton from './components/QuitButton';
import RedirectNotLogged from './components/RedirectNotLogged';

const DashBoardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div>
      {!session?.user ? <RedirectNotLogged /> : null}
      <h1>Hello {session?.user.name} !</h1>
      <QuitButton />
    </div>
  );
};

export default DashBoardPage;
