import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ClinicCreateForm from './components/clinicCreateForm';

const ClinicCreate = async () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-7">
      <h1 className="text-3xl text-black">
        {' '}
        Welcome to our Medical Management Software !
      </h1>
      <h4 className="text-xl text-gray-600">
        {' '}
        Click the button bellow to create your first clinic.
      </h4>
      <Dialog defaultOpen={true}>
        <DialogTrigger asChild>
          <Button variant="outline">Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Clinic</DialogTitle>
            <DialogDescription>
              Insert the data of your clinic and start to manage it !
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8">
            <ClinicCreateForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicCreate;
