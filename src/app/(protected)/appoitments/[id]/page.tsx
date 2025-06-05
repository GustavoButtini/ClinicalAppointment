import { ColumnDef } from '@tanstack/react-table';
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
import { appoitments, clinics, doctors, patients } from '@/db/schema';

import AddAppoitmentBtn from './components/addAppoitmentBtn';
import { DataTable } from './components/dataTableAppoitments';
import { columns } from './components/tableColumns';

interface AppointmentsPageParams {
  params: { id: string };
}

const AppointmentsPage = async ({ params }: AppointmentsPageParams) => {
  const { id } = await params;

  const listedAppointments = await db
    .select({
      id: appoitments.id,
      date: appoitments.date,
      patient: patients.name,
      patientId: patients.id,
      doctor: doctors.name,
      doctorId: doctors.id,
      clinic: clinics.name,
      clinicId: clinics.id,
      price: doctors.appoitmentPriceInCents,
    })
    .from(appoitments)
    .where(eq(appoitments.clinicId, id))
    .leftJoin(patients, eq(appoitments.patientId, patients.id))
    .leftJoin(doctors, eq(appoitments.doctorId, doctors.id))
    .leftJoin(clinics, eq(appoitments.clinicId, clinics.id));
  const listedData = listedAppointments.map((appoitment) => {
    return {
      ...appoitment,
    };
  });
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderTextualContent>
          <PageHeaderNavigation>Main - Appointments</PageHeaderNavigation>
          <PageHeaderTextualDescription>
            <PageHeaderTitle>Appointments</PageHeaderTitle>
            <PageHeaderSubTitle>
              Here you can see and create appointments for this clinic
            </PageHeaderSubTitle>
          </PageHeaderTextualDescription>
        </PageHeaderTextualContent>
        <PageHeaderButtons>
          <AddAppoitmentBtn id={id} />
        </PageHeaderButtons>
      </PageHeader>
      <PageContent>
        <div className="flex h-full flex-col content-start justify-start">
          <DataTable
            columns={columns as ColumnDef<(typeof listedData)[number]>[]}
            data={listedData}
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default AppointmentsPage;
