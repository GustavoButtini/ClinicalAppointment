'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { updateClinicAction } from '@/actions/updateClinic';
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clinics } from '@/db/schema';

const updateClinicSchema = z.object({
  id: z.string().uuid().min(1, { message: 'You need an UUID !' }),
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});
const UpdateClinic = () => {
  const [userClinics, setUserClinics] = useState<
    (typeof clinics.$inferSelect)[]
  >([]);
  const [clinic, setClinic] = useState<typeof clinics.$inferSelect>();
  const updateClinicForm = useForm<z.infer<typeof updateClinicSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(updateClinicSchema),
  });
  useEffect(() => {
    const getClinics = async () => {
      const res = await fetch('/api/user/clinics');
      const data = await res.json();
      setUserClinics(data);
    };
    getClinics();
  }, []);
  const updateClinicAct = useAction(updateClinicAction, {
    onSuccess: () => {
      toast.success('The Clinic has been updated !');
      redirect('/dashboard');
    },
    onError: () => {
      toast.error('An error has benn occured');
    },
  });

  return (
    <Form {...updateClinicForm}>
      <form>
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Chose the clinic to change</AlertDialogTitle>
              <FormField
                control={updateClinicForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>Clinic</AlertDialogDescription>
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        const selectedClinic = userClinics.find(
                          (c) => c.id === e,
                        );
                        setClinic(selectedClinic);
                        if (selectedClinic) {
                          updateClinicForm.setValue(
                            'name',
                            selectedClinic.name,
                          );
                          updateClinicForm.setValue(
                            'address',
                            selectedClinic.address,
                          );
                          updateClinicForm.setValue(
                            'phone',
                            selectedClinic.phone,
                          );
                        }
                      }}
                      value={field.value}
                      disabled={userClinics.length <= 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            userClinics.length >= 1
                              ? 'Select a Clinic'
                              : 'Getting Clinics'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {userClinics.map((clinic) => (
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
              <FormField
                control={updateClinicForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinc Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateClinicForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateClinicForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel className="w-1/2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="w-1/2"
                onClick={() => {
                  updateClinicAct.execute({
                    id: updateClinicForm.getValues('id'),
                    name: updateClinicForm.getValues('name'),
                    address: updateClinicForm.getValues('address'),
                    phone: updateClinicForm.getValues('phone'),
                  });
                }}
                disabled={clinic === undefined}
              >
                {updateClinicAct.isPending ? (
                  <p>Updating ...</p>
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

export default UpdateClinic;
