'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';

import { UpsertPatientOnDb } from '@/actions/upsertPatient';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import * as schema from '@/db/schema';

export const upsertPatientFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'You need to insert a name' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an email' })
    .email({ message: 'Invalid email format' }),
  phone: z.string().trim().min(1, { message: 'You need to insert a phone' }),
  sex: z.enum(['male', 'female'], {
    required_error: 'You need to select a sex',
  }),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, { message: 'You need to select a date' }),
});

interface UpsertPatientFormProps {
  isOpen: boolean;
  clinicId: string;
  isUpdate: boolean;
  patient?: typeof schema.patients.$inferSelect;
  onSuccess: () => void;
}

const UpsertPatientForm = ({
  isOpen,
  clinicId,
  isUpdate,
  patient,
  onSuccess,
}: UpsertPatientFormProps) => {
  const upsertPatientForm = useForm<z.infer<typeof upsertPatientFormSchema>>({
    resolver: zodResolver(upsertPatientFormSchema),
    defaultValues: {
      name: patient?.name ?? '',
      email: patient?.email ?? '',
      phone: patient?.phone ?? '',
      sex: (patient?.sex as 'male' | 'female') ?? undefined,
      dateOfBirth: patient?.dateOfBirth
        ? new Date(patient.dateOfBirth).toISOString().split('T')[0]
        : '',
    },
  });

  const upsertPatientAction = useAction(UpsertPatientOnDb, {
    onSuccess: () => {
      toast.success(
        isUpdate
          ? 'Patient updated successfully'
          : 'Patient added successfully',
      );
      onSuccess();
    },
    onError: () => {
      toast.error('An error occurred!');
    },
  });
  useEffect(() => {
    if (isOpen) {
      upsertPatientForm.reset({
        name: patient?.name ?? '',
        email: patient?.email ?? '',
        phone: patient?.phone ?? '',
        sex: (patient?.sex as 'male' | 'female') ?? undefined,
        dateOfBirth: patient?.dateOfBirth
          ? new Date(patient.dateOfBirth).toISOString().split('T')[0]
          : '',
      });
    }
  }, [isOpen, upsertPatientForm, patient]);
  const onSubmit = async (data: z.infer<typeof upsertPatientFormSchema>) => {
    upsertPatientAction.execute({
      id: patient?.id,
      ...data,
      clinicId: clinicId,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isUpdate ? 'Update Patient' : 'Add Patient'}</DialogTitle>
        <DialogDescription>
          {isUpdate ? 'Update patient information' : 'Add a new patient'}
        </DialogDescription>
      </DialogHeader>
      <Form {...upsertPatientForm}>
        <form
          onSubmit={upsertPatientForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={upsertPatientForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertPatientForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertPatientForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertPatientForm.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertPatientForm.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={upsertPatientAction.isPending}
          >
            {upsertPatientAction.isPending && (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isUpdate ? 'Update Patient' : 'Add Patient'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertPatientForm;
