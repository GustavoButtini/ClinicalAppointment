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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { upsertDoctorFormSchema } from './upsertDoctorForm';
interface WeekDayFormInterface {
  form: UseFormReturn<z.infer<typeof upsertDoctorFormSchema>>;
  type: string;
}

const WeekDayFormField = ({ form, type }: WeekDayFormInterface) => {
  const isStartForm = type === 'start';
  return (
    <FormField
      control={form.control}
      name={isStartForm ? 'availableFromWeekDay' : 'availableToWeekDay'}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {isStartForm ? (
              <>Availabiaty to start week from</>
            ) : (
              <>Availabiaty to end week on</>
            )}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select an week day" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">Monday</SelectItem>
              <SelectItem value="2">Tuesday</SelectItem>
              <SelectItem value="3">Wednesday</SelectItem>
              <SelectItem value="4">Thursday</SelectItem>
              <SelectItem value="5">Friday</SelectItem>
              <SelectItem value="6">Saturday</SelectItem>
              <SelectItem value="0">Sunday</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WeekDayFormField;
