import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  PageContainer,
  PageHeader,
  PageHeaderButtons,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
} from '@/components/ui/defaultpage';
import { auth } from '@/lib/auth';

interface DoctorsPageProps {
  params: { id: string };
}
const DoctorsPage = async ({ params }: DoctorsPageProps) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect('/authentication');
  }
  console.log(params.id);
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTextualContent>
          {/*Change to actual navigation after*/}
          <span className="inline">
            Main Page - <p className="inline text-blue-400">Medicals </p>
          </span>
          <PageHeaderTextualDescription>
            <h1 className="text-3xl text-black">Doctors</h1>
            <h6 className="text-sm text-gray-500">
              Here you can manage all your doctors and theirs information !
            </h6>
          </PageHeaderTextualDescription>
        </PageHeaderTextualContent>
        <PageHeaderButtons>
          <Button>Say Hello</Button>
        </PageHeaderButtons>
      </PageHeader>
    </PageContainer>
  );
};

export default DoctorsPage;
