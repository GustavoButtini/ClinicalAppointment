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
import { DataTable } from './components/dataTablePatients';
import { columns } from './components/tableColumns';
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
        <div className="flex-flex-col h-full content-start justify-start">
          <DataTable columns={columns} data={listedPatients} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
