'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalizeFirstLetter } from 'better-auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod';

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
export const upsertDoctorFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'You need to insert a name' }),
  specialization: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an specialization' }),
  imageurl: z.string().trim().min(1, { message: 'You need to insert a image' }),
  email: z.string().trim().min(1, { message: 'You need to insert an e-mail' }),
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
});
interface UpsertDoctorFormProps {
  clinicId: string;
  isOpen: boolean;
  isUpdate: boolean;
  doctor?: typeof schema.doctors.$inferSelect;
  onSucess?: () => void;
}
const UpsertDoctorForm = ({ isUpdate }: UpsertDoctorFormProps) => {
  const upsertDoctorForm = useForm<z.infer<typeof upsertDoctorFormSchema>>({
    resolver: zodResolver(upsertDoctorFormSchema),
    defaultValues: {
      name: '',
      specialization: '',
      imageurl: '',
      email: '',
      phone: '',
      availableFromWeekDay: '',
      availableToWeekDay: '',
      availableFromTime: '',
      availableToTime: '',
      appoitmentPriceInCents: 0,
    },
  });
  const onSubmit = () => {
    console.log('Hello !');
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
            name="imageurl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="This will change to an image insertion"
                    {...field}
                  />
                </FormControl>
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

          <FormField
            control={upsertDoctorForm.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starts work day on</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe" {...field} />
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
                <FormLabel>Price in cent of the appoitment</FormLabel>
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
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
