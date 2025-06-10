import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderNavigation,
  PageHeaderSubTitle,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
  PageHeaderTitle,
} from '@/components/ui/defaultpage';
import { sessionVerifier } from '@/helpers/sessionVerifier';
import { auth } from '@/lib/auth';

import AccountInformation from './components/accountInformation';

const UserInformationPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!(await sessionVerifier())) {
    redirect('/authentication');
  }
  const user = {
    name: session?.user.name ?? '',
    email: session?.user.email ?? '',
    phone: session?.user.phone ?? '',
    image: session?.user.image ?? '',
  };
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTextualContent>
          <PageHeaderNavigation>Main - User Information</PageHeaderNavigation>
          <PageHeaderTextualDescription>
            <PageHeaderTitle>Account Information</PageHeaderTitle>
            <PageHeaderSubTitle>
              This page you can check the information of your account
            </PageHeaderSubTitle>
          </PageHeaderTextualDescription>
        </PageHeaderTextualContent>
      </PageHeader>
      <PageContent>
        <div className="flex w-full flex-row content-center justify-center py-6">
          <AccountInformation account={user} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default UserInformationPage;
