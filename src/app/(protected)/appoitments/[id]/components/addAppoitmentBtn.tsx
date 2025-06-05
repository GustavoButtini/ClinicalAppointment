'use client';

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import UpsertAppointmentForm from './upsertAppoitmentsForm';
interface AddButtonInterface {
  id: string;
}

const AddAppoitmentBtn = ({ id }: AddButtonInterface) => {
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
        onSucess={() => {
          setIsOpen(false);
        }}
        clinicId={id}
      />
    </Dialog>
  );
};

export default AddAppoitmentBtn;
