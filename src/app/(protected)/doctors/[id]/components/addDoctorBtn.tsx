'use client';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import UpsertDoctorForm from './upsertDoctorForm';

interface AddButtonInterface {
  id: string;
}

const AddDoctorBtn = ({ id }: AddButtonInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Doctor
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm
        isUpdate={false}
        isOpen={isOpen}
        onSucess={() => {
          setIsOpen(!isOpen);
        }}
        clinicId={id}
      />
    </Dialog>
  );
};

export default AddDoctorBtn;
