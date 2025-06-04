'use client';

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { doctors, patients } from '@/db/schema';

import UpsertAppointmentForm from './upsertAppoitmentsForm';
interface AddButtonInterface {
  id: string;
  patients: (typeof patients.$inferSelect)[];
  doctors: (typeof doctors.$inferSelect)[];
}

const AddAppoitmentBtn = ({ id, doctors, patients }: AddButtonInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Appoitment
        </Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        isUpdate={false}
        isOpen={isOpen}
        doctorsClinic={doctors}
        patients={patients}
        onSucess={() => {
          setIsOpen(false);
        }}
        clinicId={id}
      />
    </Dialog>
  );
};

export default AddAppoitmentBtn;
