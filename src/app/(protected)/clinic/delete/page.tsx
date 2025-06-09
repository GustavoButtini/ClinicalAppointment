'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { deleteClinicAction } from '@/actions/deleteClinic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const deleteClinicSchema = z.object({
  id: z.string().uuid().min(1, { message: 'You need an clinic ID !' }),
});
type Clinic = { id: string; name: string };

const DeleteClinic = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [showHelperText, setShowHelperText] = useState(false);
  useEffect(() => {
    const getClinics = async () => {
      const res = await fetch('/api/user/clinics');
      const data = await res.json();
      console.log(data);
      setClinics(data);
    };
    getClinics();
  }, []);
  const deleteClinicForm = useForm<z.infer<typeof deleteClinicSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(deleteClinicSchema),
  });
  const deleteClinicAct = useAction(deleteClinicAction, {
    onSuccess: () => {
      toast.success('The clinic has been deleted');
      redirect('/dashboard');
    },
    onError: () => {
      toast.error('An error has been occured');
    },
  });
  const onSubmit = (data: z.infer<typeof deleteClinicSchema>) => {
    console.log('A');
    deleteClinicAct.execute({ id: data.id });
    deleteClinicForm.reset();
  };

  return (
    <Form {...deleteClinicForm}>
      <form onSubmit={deleteClinicForm.handleSubmit(onSubmit)}>
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent className="space-y-2">
            <AlertDialogHeader className="space-y-2">
              <AlertDialogTitle>
                Select the clinic to delete it
              </AlertDialogTitle>

              <FormField
                control={deleteClinicForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>Clinic</AlertDialogDescription>
                    </FormLabel>
                    <Select
                      disabled={clinics.length <= 0}
                      onValueChange={(e) => {
                        field.onChange(e);
                        setShowHelperText(true);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            clinics.length >= 1
                              ? 'Select a Clinic'
                              : 'Getting the clinics...'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {clinics.map((clinic) => (
                          <SelectItem key={clinic.id} value={clinic.id}>
                            {clinic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {showHelperText ? (
                <>
                  The deletion of the clinic is irreversible, you will not be
                  able to get back all the data stored, as the doctors, patients
                  and appoitments, only delete afte you´re sure that is safe to
                  remove this data
                </>
              ) : (
                <></>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel className="w-1/2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="w-1/2"
                asChild
                onClick={() => {
                  deleteClinicAct.execute(deleteClinicForm.getValues());
                }}
                disabled={clinics.length <= 0}
              >
                {deleteClinicAct.isPending ? (
                  <p>Deleting ...</p>
                ) : (
                  <p>Confirm</p>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};

export default DeleteClinic;
