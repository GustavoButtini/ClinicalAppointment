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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'The Email ins´t valid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

const LoginFormComponent = () => {
  const route = useRouter();
  const [showPass, setShowPass] = useState(false);
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          route.push('/dashboard');
        },
        onError: () => {
          loginForm.setError('root', {
            type: 'manual',
            message: 'Invalid email or password',
          });
          toast.error('Invalid email or password', {
            description: 'Please check your credentials and try again.',
            descriptionClassName: 'text-sm text-gray-500',
            duration: 3000,
            icon: '🚫',
            style: {
              backgroundColor: '#f8d7da',
              color: '#000',
            },
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          });
        },
      },
    );
  };
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      scopes: ['email', 'profile'],
    });
  };

  return (
    <form
      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
      className="space-y-4"
    >
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Hi , welcome back to our platform! Please enter your credentials to
          log in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...loginForm}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="SampleMail@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
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
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          type="submit"
          className={
            loginForm.formState.isSubmitting
              ? 'w-full bg-black'
              : 'w-full hover:bg-black'
          }
          disabled={loginForm.formState.isSubmitting}
        >
          {loginForm.formState.isSubmitting ? <Loader></Loader> : <>Login</>}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGoogleLogin}
        >
          <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginFormComponent;
