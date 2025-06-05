'use client';

import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

import AppoitmentModifyMenu from './appoitmentModifyMenu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const AppoitmentSchema = z.object({
  id: z.string({}).uuid().min(1, { message: 'You need to insert a ID !' }),
  doctorId: z
    .string({})
    .trim()
    .min(1, { message: 'You need to insert a doctor !' })
    .nonempty(),
  patientId: z
    .string({})
    .trim()
    .min(1, { message: 'You need to insert a patient !' })
    .nonempty(),
  clinicId: z
    .string({})
    .uuid()
    .min(1, { message: 'You need to insert a clinic !' })
    .nonempty(),
  date: z.date(),
  price: z
    .number({})
    .min(1, { message: 'You need to insert a value greater than 0 !' }),
});
type Appoitment = z.infer<typeof AppoitmentSchema>;
export const columns: ColumnDef<Appoitment>[] = [
  {
    id: 'Patient',
    accessorKey: 'patient',
    header: 'Patient',
  },
  {
    id: 'Date',
    accessorKey: 'date',
    header: 'Date',
    cell: (params) => {
      const date = params.row.original.date;
      return (
        <>
          {date.toLocaleDateString() +
            ' - ' +
            date.toLocaleTimeString().substring(0, 5)}
        </>
      );
    },
  },
  {
    id: 'Doctor',
    accessorKey: 'doctor',
    header: 'Doctor',
  },
  {
    id: 'Clinic',
    accessorKey: 'clinic',
    header: 'Clinic',
  },

  {
    id: 'Price',
    accessorKey: 'price',
    header: 'Price',
  },
  {
    id: 'ModifyAppoitment',
    accessorKey: 'modify',
    header: 'Modify Appoitments',
    cell: (params) => {
      const appoitment = params.row.original;
      return <AppoitmentModifyMenu appoitment={appoitment} />;
    },
  },
];
