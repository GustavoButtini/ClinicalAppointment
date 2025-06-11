'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updatePasswordAction } from '@/actions/changePassword';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, 'The password has to be 8 characters long'),
    newPassword: z.string().min(8, 'The password has to be 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'The password has to be 8 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface ChangePasswordDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });
  const updatePasswordAct = useAction(updatePasswordAction, {
    onSuccess: () => {
      toast.success('The password has been changed');
    },
    onError: (serverError) => {
      toast.error(serverError.error.serverError ?? '');
    },
  });
  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    updatePasswordAct.execute(values);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your current password and the new password you wish to set.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="mb-1 block text-sm font-medium">Current Password</p>
            <Input
              type="password"
              {...form.register('oldPassword')}
              disabled={updatePasswordAct.isPending}
            />
            {form.formState.errors.oldPassword && (
              <span className="text-xs text-red-500">
                {form.formState.errors.oldPassword.message}
              </span>
            )}
          </div>
          <div>
            <p className="mb-1 block text-sm font-medium">New Password</p>
            <Input
              type="password"
              {...form.register('newPassword')}
              disabled={updatePasswordAct.isPending}
            />
            {form.formState.errors.newPassword && (
              <span className="text-xs text-red-500">
                {form.formState.errors.newPassword.message}
              </span>
            )}
          </div>
          <div>
            <p className="mb-1 block text-sm font-medium">
              Confirm New Password
            </p>
            <Input
              type="password"
              {...form.register('confirmPassword')}
              disabled={updatePasswordAct.isPending}
            />
            {form.formState.errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>
          <AlertDialogFooter>
            <Button type="submit" disabled={updatePasswordAct.isPending}>
              {updatePasswordAct.isPending ? (
                <>Changing Password...</>
              ) : (
                <>Change Password</>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePasswordDialog;
