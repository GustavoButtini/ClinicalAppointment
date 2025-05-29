import { redirect } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

const LogOutPage = () => {
  authClient.signOut();
  redirect('/authentication');
};

export default LogOutPage;
