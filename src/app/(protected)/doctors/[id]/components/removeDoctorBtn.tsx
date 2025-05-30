'use client';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { toast } from 'sonner';

import { DeleteDoctor } from '@/actions/deleteDoctor';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { doctors } from '@/db/schema';

interface RemoveDocBtnProps {
  doctor: typeof doctors.$inferSelect;
  clinicId: string;
  onSucess: () => void;
}

const RemoveDoctorBtn = ({ doctor, clinicId, onSucess }: RemoveDocBtnProps) => {
  const DeleteDoctorAction = useAction(DeleteDoctor, {
    onSuccess: () => {
      toast.success('Doctor removed with sucess !');
      onSucess();
    },
    onError: () => {
      toast.error('An error has occoured !');
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-1/2 bg-red-500">Remove Doctor</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure of this action ?</AlertDialogTitle>
          <AlertDialogDescription>
            The removal of the doctor {doctor.name} is permanent, will not
            recover any time soon
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              DeleteDoctorAction.execute({ docId: doctor.id, clinicId });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDoctorBtn;
