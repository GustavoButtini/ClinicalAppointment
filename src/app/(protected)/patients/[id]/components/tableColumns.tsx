'use client';

import { ColumnDef } from '@tanstack/react-table';

import { patients } from '@/db/schema';

import PatientIteractionMenu from './patientIteractionMenu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Patient = typeof patients.$inferSelect;

export const columns: ColumnDef<Patient>[] = [
  {
    id: 'Name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'Phone',
    accessorKey: 'phone',
    header: 'Phone',
    cell: (params) => {
      const patient = params.row.original;
      const phoneNumber = patient.phone;
      if (!phoneNumber) return '';
      const formatted = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3',
      );
      return formatted;
    },
  },
  {
    id: 'Sex',
    accessorKey: 'sex',
    header: 'Sex',
  },
  {
    id: 'More',
    cell: (params) => {
      const patient = params.row.original;
      return <PatientIteractionMenu patient={patient} />;
    },
  },
];
