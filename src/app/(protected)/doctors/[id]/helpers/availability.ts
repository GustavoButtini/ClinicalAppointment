import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { doctors } from '@/db/schema';

dayjs.extend(utc);

export const Availability = (doctor: typeof doctors.$inferSelect) => {
  const from = dayjs()
    .utc()
    .day(Number(doctor.availableFromWeekDay))
    .set('hour', Number(doctor.availableFromTime.split(':')[0]))
    .set('minute', Number(doctor.availableFromTime.split(':')[1]))
    .set('second', Number(doctor.availableFromTime.split(':')[2]))
    .local();
  const to = dayjs()
    .utc()
    .day(Number(doctor.availableToWeekDay))
    .set('hour', Number(doctor.availableToTime.split(':')[0]))
    .set('second', Number(doctor.availableToTime.split(':')[2]))
    .set('minute', Number(doctor.availableToTime.split(':')[1]))
    .local();
  return { from, to };
};
