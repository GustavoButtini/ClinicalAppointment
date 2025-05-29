import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import {
  PageContainer,
  PageHeader,
  PageHeaderButtons,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
} from '@/components/ui/defaultpage';
import { auth } from '@/lib/auth';

import AddDoctorBtn from './components/addDoctorBtn';
interface DoctorsPageParams {
  params: { id: string };
}

const DoctorsPage = async ({ params }: DoctorsPageParams) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { id } = await params;
  if (!session?.user) {
    redirect('/authentication');
  }
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
          <AddDoctorBtn id={id} />
        </PageHeaderButtons>
      </PageHeader>
    </PageContainer>
  );
};

export default DoctorsPage;
