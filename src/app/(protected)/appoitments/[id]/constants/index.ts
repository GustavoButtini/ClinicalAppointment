import {
  appoitmentEveningDisponibility,
  appoitmentMorningDisponibility,
  appoitmentNightDisponibility,
} from '@/app/(protected)/doctors/[id]/constants';

export const allAvailabilityTimes = [
  ...appoitmentMorningDisponibility,
  ...appoitmentEveningDisponibility,
  ...appoitmentNightDisponibility,
];
