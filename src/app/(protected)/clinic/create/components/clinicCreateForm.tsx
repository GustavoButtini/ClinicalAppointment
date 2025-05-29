'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { createClinic } from '@/actions/create-clinic';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UnathorizedError } from '@/errors/unathorizedError';
const clinicFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'The name has to be declared' }),
  address: z
    .string()
    .trim()
    .min(1, { message: 'The addres has to be declared' }),
  phone: z.string().trim().min(1, { message: 'The phone has to be declared' }),
});

const ClinicCreateForm = () => {
  const clinicForm = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
    },
  });
  async function onCreateSubmit(data: z.infer<typeof clinicFormSchema>) {
    try {
      await createClinic(data);
      toast.success('Your clinic has been created !', {
        action: {
          label: 'Close',
          onClick() {
            toast.dismiss();
          },
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof UnathorizedError) {
        toast(e.message.toString(), {
          action: {
            label: 'Close',
            onClick() {
              toast.dismiss();
            },
          },
        });
      }
    }
    redirect('/dashboard');
  }
  return (
    <form
      onSubmit={clinicForm.handleSubmit(onCreateSubmit)}
      className="h-full w-full space-y-6"
    >
      <Form {...clinicForm}>
        <FormField
          control={clinicForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CliniC Name</FormLabel>
              <FormControl>
                <Input placeholder="Good Live" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={clinicForm.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Addres</FormLabel>
              <FormControl>
                <Input type="text" placeholder="St 590, Brooklyn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={clinicForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="e-full w-full"
          disabled={clinicForm.formState.isSubmitting}
        >
          {clinicForm.formState.isSubmitting ? (
            <Loader></Loader>
          ) : (
            <>Create Clinic</>
          )}
        </Button>
      </Form>
    </form>
  );
};

export default ClinicCreateForm;
