'use client';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

import { authClient } from '@/lib/auth-client';
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const RedirectNotLogged = () => {
  const session = authClient.useSession();
  useEffect(() => {
    const redirectToLogin = async () => {
      if (!session.data?.user) {
        await sleep(2000);
        redirect('/authentication');
      }
    };
    redirectToLogin();
  }, [session.data?.user]);
  if (!session.data?.user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="text-black-500 text-4xl">
          You need to logon to acess this page
        </h1>
        <p className="text-black-400 text-xl">
          Redirecting you to make the login !
        </p>
      </div>
    );
  }
};

export default RedirectNotLogged;
