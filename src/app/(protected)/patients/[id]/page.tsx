import { eq } from 'drizzle-orm';
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
import { db } from '@/db';
import { patients } from '@/db/schema';

import AddPatientButton from './components/addPatientButton';
interface PatientsPageParams {
  params: { id: string };
}

const PatientsPage = async ({ params }: PatientsPageParams) => {
  const { id } = await params;
  const listedPatients = await db
    .select()
    .from(patients)
    .where(eq(patients.clinicId, id));
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTextualContent>
          <PageHeaderNavigation>Main - Patients</PageHeaderNavigation>
          <PageHeaderTextualDescription>
            <PageHeaderTitle>Patients</PageHeaderTitle>
            <PageHeaderSubTitle>
              Here you can see the information of every patient and their
              apoitments
            </PageHeaderSubTitle>
          </PageHeaderTextualDescription>
        </PageHeaderTextualContent>
        <PageHeaderButtons>
          <AddPatientButton id={id} />
        </PageHeaderButtons>
      </PageHeader>
      <PageContent>
        {listedPatients.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
