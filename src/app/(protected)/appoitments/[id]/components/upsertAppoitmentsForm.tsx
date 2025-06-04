'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalizeFirstLetter } from 'better-auth';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createAppointment } from '@/actions/upsertAppoitment/index';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
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
import { appoitments, doctors, patients } from '@/db/schema';

import AppoitmentDateSelect from './appoitmentDateSelect';
import AppoitmentTimeSelect from './appoitmentTimeSelect';

export const appointmentSchema = z.object({
  patientId: z.string().uuid({ message: 'Select a patient' }),
  doctorId: z.string().uuid({ message: 'Select a doctor' }),
  date: z.date({ required_error: 'Select a Date !' }),
  time: z.string().min(1, { message: 'Select a time' }),
});

dayjs.extend(utc);

interface AddAppointmentFormProps {
  isOpen?: boolean;
  clinicId: string;
  isUpdate: boolean;
  doctorsClinic: (typeof doctors.$inferSelect)[];
  patients: (typeof patients.$inferSelect)[];
  appoitment?: typeof appoitments.$inferSelect;
  onSucess: () => void;
}

const UpsertAppointmentForm = ({
  clinicId,
  isUpdate,
  doctorsClinic,
  patients,
  appoitment,
  onSucess,
}: AddAppointmentFormProps) => {
  const [doctor, setDoctor] = useState<typeof doctors.$inferSelect>();
  let time, date;
  if (appoitment !== undefined) {
    time =
      dayjs()
        .hour(appoitment?.date.getHours())
        .minute(appoitment?.date.getMinutes())
        .second(appoitment?.date.getSeconds())
        .utc()
        .local()
        .toString() || '';
    date =
      dayjs()
        .day(appoitment.date.getDay())
        .month(appoitment.date.getMonth())
        .year(appoitment.date.getFullYear())
        .utc()
        .local()
        .toDate() || new Date('01/01/1901');
  }
  const upsertAppoitmentForm = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: appoitment?.patientId ?? '',
      doctorId: appoitment?.doctorId ?? '',
      date: date,
      time: time ?? '',
    },
  });

  const upsertAppoitmentAction = useAction(createAppointment, {
    onSuccess: () => {
      toast.success('The Appoitment has been made');
      onSucess();
    },
    onError: () => {
      toast.error('An Error has been occoured !');
    },
  });

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    if (!data.patientId) return;
    if (doctor === undefined) {
      toast.error('The doctor cannot be find, try again !');
      return;
    }
    data.date.setHours(parseInt(data.time.split(':')[0]));
    data.date.setMinutes(parseInt(data.time.split(':')[1]));
    upsertAppoitmentAction.execute({
      clinicId: clinicId,
      patientId: data.patientId,
      doctorId: doctor.id,
      date: data.date.toISOString(),
      priceInCents: doctor.appoitmentPriceInCents * 100,
    });
    upsertAppoitmentForm.reset();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isUpdate ? <> Update an Appoitment </> : <> Add an Appoitment</>}
        </DialogTitle>
        <DialogDescription>
          {isUpdate ? (
            <>Here you will update the Appoitment </>
          ) : (
            <>Here you will add an new Appoitment </>
          )}
        </DialogDescription>
      </DialogHeader>
      <Form {...upsertAppoitmentForm}>
        <form
          onSubmit={upsertAppoitmentForm.handleSubmit(onSubmit)}
          className="flex w-full max-w-lg flex-col gap-4"
        >
          <FormField
            control={upsertAppoitmentForm.control}
            name="patientId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upsertAppoitmentForm.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doctor</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    setDoctor(doctorsClinic.find((doc) => doc.id === val));
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {doctorsClinic.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name} - {capitalizeFirstLetter(doc.specialization)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={upsertAppoitmentForm.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Date</FormLabel>
                  {doctor !== undefined ? (
                    <AppoitmentDateSelect
                      doctor={doctor}
                      fieldValue={field.value}
                      fieldOnChange={field.onChange}
                    />
                  ) : (
                    <p>Select an Doctor !</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={upsertAppoitmentForm.control}
              name="time"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {doctor !== undefined ? (
                        <AppoitmentTimeSelect doctor={doctor} />
                      ) : (
                        <p>Select an Doctor</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={upsertAppoitmentAction.isPending}>
            {upsertAppoitmentAction.isPending
              ? 'Creating...'
              : 'Create Appointment'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertAppointmentForm;
