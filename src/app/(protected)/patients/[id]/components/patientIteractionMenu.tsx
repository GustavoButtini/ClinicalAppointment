'use client';
import { Dialog } from '@radix-ui/react-dialog';
import { MenuIcon, SquareArrowOutUpRightIcon, TrashIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { DeletePatient } from '@/actions/deletePatient';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { patients } from '@/db/schema';

import UpsertPatientForm from './upsertPatientForm';

interface PatientIteractionMenuProps {
  patient: typeof patients.$inferSelect;
}

const PatientIteractionMenu = ({ patient }: PatientIteractionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeletePatient = useAction(DeletePatient, {
    onSuccess: () => {
      toast.success('Patient removed with sucess');
      setIsOpen(false);
    },
    onError: () => {
      toast.error('An error has occoured !');
    },
  });
  const tryRemovePatient = () => {
    if (!patient) return;
    handleDeletePatient.execute({
      patId: patient.id,
      clinicId: patient.clinicId,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <SquareArrowOutUpRightIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <TrashIcon /> Remove
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to delete this patient ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone, this is remove the patient and
                  all of his appoitments !
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={tryRemovePatient}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpsertPatientForm
        isUpdate={true}
        patient={patient}
        onSuccess={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        clinicId={patient.clinicId}
      />
    </Dialog>
  );
};

export default PatientIteractionMenu;
