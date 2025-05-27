'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'The Email ins´t valid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 6 characters long' }),
});

const LoginFormComponent = () => {
  const [showPass, setShowPass] = useState(false);
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginFormSchema>) => {
    console.log('Login data:', data);
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
      <CardFooter>
        <Button>Login</Button>
      </CardFooter>
    </form>
  );
};

export default LoginFormComponent;
