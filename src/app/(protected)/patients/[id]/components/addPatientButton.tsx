'use client';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import UpsertPatientForm from './upsertPatientForm';

interface AddButtonInterface {
  id: string;
}

const AddPatientButton = ({ id }: AddButtonInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Patient
        </Button>
      </DialogTrigger>
      <UpsertPatientForm
        isUpdate={false}
        onSuccess={() => {
          setIsOpen(false);
        }}
        clinicId={id}
      />
    </Dialog>
  );
};

export default AddPatientButton;
