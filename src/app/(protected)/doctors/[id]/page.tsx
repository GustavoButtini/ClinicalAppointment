import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderButtons,
  PageHeaderNavigation,
  PageHeaderSubTitle,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
  PageHeaderTitle,
} from '@/components/ui/defaultpage';
import { DoctorsPageContentGridFourByTwo } from '@/components/ui/docspage';
import { db } from '@/db';
import { doctors as docs } from '@/db/schema';
import { auth } from '@/lib/auth';

import AddDoctorBtn from './components/addDoctorBtn';
import DoctorCard from './components/doctorCard';
interface DoctorsPageParams {
  params: { id: string };
}

const DoctorsPage = async ({ params }: DoctorsPageParams) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { id } = await params;
  if (!session?.user) {
    redirect('/authentication');
  }
  const doctors = await db.query.doctors.findMany({
    where: eq(docs.clinicId, id),
  });
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTextualContent>
          <PageHeaderNavigation>Main - Doctors</PageHeaderNavigation>
          <PageHeaderTextualDescription>
            <PageHeaderTitle>Doctors</PageHeaderTitle>
            <PageHeaderSubTitle>
              Here you can manage all your doctors and theirs information !
            </PageHeaderSubTitle>
          </PageHeaderTextualDescription>
        </PageHeaderTextualContent>
        <PageHeaderButtons>
          <AddDoctorBtn id={id} />
        </PageHeaderButtons>
      </PageHeader>
      <PageContent>
        <DoctorsPageContentGridFourByTwo>
          {doctors.map((doctor) => {
            return <DoctorCard key={doctor.email} doc={doctor} />;
          })}
        </DoctorsPageContentGridFourByTwo>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
