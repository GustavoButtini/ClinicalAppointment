import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dateFormatter = (time: string) => {
  return dayjs(time).utc().local().format('DD/MM/YYYY, HH:mm');
};
