'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalizeFirstLetter } from 'better-auth';
import { LoaderIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';

import { UpsertDoctorOnDb } from '@/actions/upsertDoctor';
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

import { medicalSpecialties } from '../constants';
import DisponibilityTimeFormField from './disponibilityTimeFormField';
import WeekDayFormField from './weekDayFormField';
export const upsertDoctorFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'You need to insert a name' }),
    specialization: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an specialization' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an e-mail' }),
    phone: z.string().trim().min(1, { message: 'You need to insert an phone' }),
    availableFromWeekDay: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an E-mail' }),
    availableToWeekDay: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an E-mail' }),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an E-mail' }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: 'You need to insert an E-mail' }),
    appoitmentPriceInCents: z
      .number()
      .int()
      .min(1, { message: 'You need to insert a price' }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: 'The starting hour needs to be greater than  the end hour',
      path: ['availableToTime'],
    },
  );
interface UpsertDoctorFormProps {
  clinicId: string;
  isOpen: boolean;
  isUpdate: boolean;
  doctor?: typeof schema.doctors.$inferSelect;
  onSucess: () => void;
}
const UpsertDoctorForm = ({
  clinicId,
  isUpdate,
  onSucess,
}: UpsertDoctorFormProps) => {
  const upsertDoctorForm = useForm<z.infer<typeof upsertDoctorFormSchema>>({
    resolver: zodResolver(upsertDoctorFormSchema),
    defaultValues: {
      name: '',
      specialization: '',
      email: '',
      phone: '',
      availableFromWeekDay: '',
      availableToWeekDay: '',
      availableFromTime: '',
      availableToTime: '',
      appoitmentPriceInCents: 0,
    },
  });
  const upsertDoctorAction = useAction(UpsertDoctorOnDb, {
    onSuccess: () => {
      toast.success('Doctor Added with sucess');
      onSucess();
    },
    onError: () => {
      toast.error('An error happend !');
    },
  });
  const onSubmit = async (data: z.infer<typeof upsertDoctorFormSchema>) => {
    upsertDoctorAction.execute({
      ...data,
      appoitmentPriceInCents: data.appoitmentPriceInCents * 100,
      clinicId: clinicId,
    });
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isUpdate ? <> Update an Doctor </> : <> Add an Doctor</>}
        </DialogTitle>
        <DialogDescription>
          {isUpdate ? (
            <>Here you will update the Doctor </>
          ) : (
            <>Here you will add an new Doctor </>
          )}
        </DialogDescription>
      </DialogHeader>
      <Form {...upsertDoctorForm}>
        <form
          onSubmit={upsertDoctorForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={upsertDoctorForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Carl Pucs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertDoctorForm.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select an specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((item) => {
                      return (
                        <SelectItem key={item} value={item}>
                          {capitalizeFirstLetter(item)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upsertDoctorForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="carl.pucs@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upsertDoctorForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <WeekDayFormField form={upsertDoctorForm} type="start" />
          <WeekDayFormField form={upsertDoctorForm} type="end" />
          <DisponibilityTimeFormField form={upsertDoctorForm} type="start" />
          <DisponibilityTimeFormField form={upsertDoctorForm} type="end" />
          <FormField
            control={upsertDoctorForm.control}
            name="appoitmentPriceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price of the appoitment</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value.floatValue);
                    }}
                    decimalScale={2}
                    fixedDecimalScale
                    decimalSeparator=","
                    allowNegative={false}
                    allowLeadingZeros={false}
                    thousandSeparator="."
                    customInput={Input}
                    prefix="US$"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={upsertDoctorAction.isPending}
          >
            {upsertDoctorAction.isPending ? <LoaderIcon /> : <>Add doctor</>}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
