'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpFormComponent = () => {
  const route = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  });
  async function onRegisterSubmit(data: z.infer<typeof registerSchema>) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        // @ts-expect-error -- phone is not in the default user type but is correctly handled by the authClient
        phone: data.phone,
      },
      {
        onSuccess: () => {
          route.push('/dashboard');
        },
        onError: () => {
          registerForm.setError('email', {
            type: 'manual',
            message: 'Email already exists or is invalid',
          });
          toast.error('Your form has errors', {
            description: 'Please check the form and try again.',
            icon: '🚨',
            action: {
              label: 'Close',
              onClick: () => {
                toast.dismiss();
              },
            },
          });
        },
      },
    );
  }
  return (
    <form
      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
      className="space-y-6"
    >
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Welcome to our medical clinic management system! Please fill in the
          registration form to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...registerForm}>
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    type="mail"
                    placeholder="Jhon.Doe@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The email address needs to be valid and unique.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex space-x-0">
                    <Input
                      type={showPass ? 'text' : 'password'}
                      className="max-w-[100%] min-w-[100%] flex-1"
                      placeholder="shadcn"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="-ml-10"
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    >
                      {showPass ? (
                        <EyeOff color="black" size={'20px'}></EyeOff>
                      ) : (
                        <Eye color="black" size={'20px'}></Eye>
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  The password must be at least 6 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="flex space-x-0">
                    <Input
                      type={showConfPass ? 'text' : 'password'}
                      className="max-w-[100%] min-w-[100%] flex-1"
                      placeholder="shadcn"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="-ml-10"
                      onClick={() => {
                        setShowConfPass(!showConfPass);
                      }}
                    >
                      {showConfPass ? (
                        <EyeOff color="black" size={'20px'}></EyeOff>
                      ) : (
                        <Eye color="black" size={'20px'}></Eye>
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  This passwordm must match the previous one.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
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
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="e-full"
          disabled={registerForm.formState.isSubmitting}
        >
          {registerForm.formState.isSubmitting ? (
            <Loader></Loader>
          ) : (
            <>Create Account</>
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpFormComponent;
