import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';

import { SelectContent, SelectItem } from '@/components/ui/select';
import { doctors } from '@/db/schema';

import { allAvailabilityTimes } from '../constants';
interface AppoitmentTimeSelectProps {
  doctor: typeof doctors.$inferSelect;
}
dayjs.extend(utc);

const AppoitmentTimeSelect = ({ doctor }: AppoitmentTimeSelectProps) => {
  const docStartDate = dayjs()
    .utc()
    .set('hours', parseInt(doctor.availableFromTime.split(':')[0]))
    .set('minutes', parseInt(doctor.availableFromTime.split(':')[1]))
    .local();
  const docEndDate = dayjs()
    .utc()
    .set('hours', parseInt(doctor.availableToTime.split(':')[0]))
    .set('minutes', parseInt(doctor.availableToTime.split(':')[1]))
    .local();
  const startDate = allAvailabilityTimes.findIndex(
    (time) => time === docStartDate.format('HH:mm'),
  );
  const endDate = allAvailabilityTimes.findIndex(
    (time) => time === docEndDate.format('HH:mm'),
  );
  const docTime = allAvailabilityTimes.slice(startDate, endDate + 1);
  return (
    <SelectContent>
      {docTime.map((time) => (
        <SelectItem key={time} value={time}>
          {time}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default AppoitmentTimeSelect;
