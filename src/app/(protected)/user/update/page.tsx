'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import ChangePasswordDialog from './components/changePasswordDialog';

const updateUserSchema = z.object({
  id: z.string().uuid().min(1, { message: 'You need an user ID !' }),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
});

const UpdateUser = () => {
  const [data, setData] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const updateUserForm = useForm<z.infer<typeof updateUserSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(updateUserSchema),
  });
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch('/api/user/me');
      if (res.status >= 400) {
        redirect('/authentication');
      }
      const data = await res.json();
      updateUserForm.reset({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone ?? '',
        image: data.image ?? '',
      });
      setData(data.id);
    };
    getUserInfo();
  }, [updateUserForm]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    updateUserForm.setValue('image', url);
  };

  return (
    <Form {...updateUserForm}>
      <form>
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Update Your account information
              </AlertDialogTitle>
              <FormField
                control={updateUserForm.control}
                name="name"
                disabled={data === ''}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>User</AlertDialogDescription>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={updateUserForm.control}
                name="email"
                disabled={data === ''}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>E-mail</AlertDialogDescription>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={updateUserForm.control}
                name="phone"
                disabled={data === ''}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>Phone</AlertDialogDescription>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={updateUserForm.control}
                name="image"
                disabled={data === ''}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <AlertDialogDescription>
                        Profile Image
                      </AlertDialogDescription>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        {preview && (
                          <Image
                            src={preview}
                            alt="Profile Preview"
                            width={80}
                            height={80}
                            className="rounded-full border object-cover"
                          />
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <button
                          type="button"
                          className="bg-primary hover:bg-primary/90 max-y-2 rounded px-3 py-1 text-sm text-white transition"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select Image
                        </button>
                        {/* Campo oculto para armazenar o link da imagem */}
                        <Input type="hidden" {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex w-full flex-row content-center justify-start">
                <Button
                  className="w-1/2"
                  disabled={data === ''}
                  onClick={() => setIsChangePassOpen(true)}
                >
                  Change Password
                </Button>
                <Button className="w-1/2" disabled={data === ''}>
                  Confirm Data
                </Button>
              </div>
            </AlertDialogFooter>
            <ChangePasswordDialog
              open={isChangePassOpen}
              onOpenChange={setIsChangePassOpen}
            />
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};

export default UpdateUser;
