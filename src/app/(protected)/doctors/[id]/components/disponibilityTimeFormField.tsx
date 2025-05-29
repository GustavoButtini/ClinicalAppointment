import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  appoitmentEveningDisponibility,
  appoitmentMorningDisponibility,
  appoitmentNightDisponibility,
} from '../constants';
import { upsertDoctorFormSchema } from './upsertDoctorForm';

interface DisponibilityTimeFormProps {
  form: UseFormReturn<z.infer<typeof upsertDoctorFormSchema>>;
  type: string;
}

const DisponibilityTimeFormField = ({
  form,
  type,
}: DisponibilityTimeFormProps) => {
  const isStartForm = type === 'start';
  return (
    <FormField
      control={form.control}
      name={isStartForm ? 'availableFromTime' : 'availableToTime'}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {isStartForm ? (
              <>Time to start the appoitments </>
            ) : (
              <>Time to end the appoitments</>
            )}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select an week day" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Morning</SelectLabel>
                {appoitmentMorningDisponibility.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Evening</SelectLabel>
                {appoitmentEveningDisponibility.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Morning</SelectLabel>
                {appoitmentNightDisponibility.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DisponibilityTimeFormField;
