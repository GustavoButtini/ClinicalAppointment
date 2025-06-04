import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { doctors } from '@/db/schema';
interface AppoitmentDateSelectProps {
  doctor: typeof doctors.$inferSelect;
  fieldValue: Date;
  fieldOnChange: () => void;
}
const AppoitmentDateSelect = ({
  doctor,
  fieldValue,
  fieldOnChange,
}: AppoitmentDateSelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <FormControl className="w-full">
          <Button
            variant={'outline'}
            className="text-muted-foreground flex w-full flex-row content-start justify-start text-left"
          >
            {fieldValue ? format(fieldValue, 'PPP') : <span>Pick a Date</span>}
            <CalendarIcon />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Calendar
          mode="single"
          selected={fieldValue}
          onSelect={fieldOnChange}
          disabled={(date) => {
            if (!doctor) return false;
            const weekDay = date.getDay();
            if (
              parseInt(doctor.availableFromWeekDay) <=
              parseInt(doctor.availableToWeekDay)
            ) {
              return (
                weekDay < parseInt(doctor.availableFromWeekDay) ||
                weekDay > parseInt(doctor.availableToWeekDay)
              );
            }
            return (
              weekDay < parseInt(doctor.availableFromWeekDay) &&
              weekDay > parseInt(doctor.availableToWeekDay)
            );
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppoitmentDateSelect;
