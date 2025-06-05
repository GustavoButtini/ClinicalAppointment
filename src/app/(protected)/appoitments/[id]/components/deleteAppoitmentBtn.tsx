import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { toast } from 'sonner';

import { deleteAppoitment } from '@/actions/deleteAppoitment';
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
import { appoitments } from '@/db/schema';

interface DeleteAppoitmentBtnProps {
  appoitment: typeof appoitments.$inferSelect;
  clinicId: string;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}

const DeleteAppoitmentBtn = ({
  appoitment,
  clinicId,
  isDeleting,
  setIsDeleting,
}: DeleteAppoitmentBtnProps) => {
  const deleteAppoitmentAction = useAction(deleteAppoitment, {
    onSuccess: () => {
      toast.success('Appoitment removed with sucess !');
      setIsDeleting(false);
    },
    onError: () => {
      toast.error('Canno´t remove te appoitment, try again later !');
      setIsDeleting(false);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-1/3 bg-red-500" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete Appoitment'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure of this action ?</AlertDialogTitle>
          <AlertDialogDescription>
            The removal of the appoitment marked for{' '}
            {appoitment.date.toLocaleDateString()} at{' '}
            {appoitment.date.toLocaleTimeString()}is permanent, will not recover
            any time soon
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsDeleting(true);
              deleteAppoitmentAction.execute({
                appoitmentId: appoitment.id,
                clinicId: clinicId,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAppoitmentBtn;
