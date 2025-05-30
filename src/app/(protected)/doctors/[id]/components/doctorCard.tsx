import { capitalizeFirstLetter } from 'better-auth';
import { CalendarIcon, ClockIcon, DollarSignIcon } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { doctors } from '@/db/schema';
import { formatCurrencyInCentes } from '@/helpers/currency';

import { Availability } from '../helpers/availability';

interface DoctorCardProps {
  doc: typeof doctors.$inferSelect;
}

const DoctorCard = ({ doc }: DoctorCardProps) => {
  const docsInitials = doc.name
    .split(' ')
    .map((item) => item[0])
    .join('');
  const docAvailability = Availability(doc);

  return (
    <Card className="h-full gap-y-0">
      <CardHeader className="flex flex-row justify-start gap-3 pt-4 pb-4">
        <div className="flex h-full w-full flex-row">
          <Avatar className="h-full w-4/12 items-center gap-2">
            <AvatarFallback className="h-20 w-20">
              {docsInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-8/12 flex-col content-start justify-center">
            <h3 className="w-full text-2xl font-black">{doc.name}</h3>
            <p className="text-muted-foreground w-full text-sm">
              {capitalizeFirstLetter(doc.specialization)}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="flex flex-col gap-1 space-y-4 pb-4">
        <Badge
          variant={'outline'}
          className="flex w-8/12 flex-row content-start justify-start p-2"
        >
          <CalendarIcon className="mr-1" />
          <p className="text-sm">
            {docAvailability.from.format('dddd')} to{' '}
            {docAvailability.to.format('dddd')}
          </p>
        </Badge>
        <Badge
          variant={'outline'}
          className="flex w-8/12 flex-row content-start justify-start p-2"
        >
          <ClockIcon className="mr-1" />
          <p className="text-sm">
            {docAvailability.from.format('HH:mm')} to{' '}
            {docAvailability.to.format('HH:mm')}
          </p>
        </Badge>
        <Badge
          variant={'outline'}
          className="flex w-8/12 flex-row content-start justify-start p-2"
        >
          <DollarSignIcon className="mr-1" />
          <p className="text-sm">
            {formatCurrencyInCentes(doc.appoitmentPriceInCents)}
          </p>
        </Badge>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>See Details</Button>
          </DialogTrigger>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
