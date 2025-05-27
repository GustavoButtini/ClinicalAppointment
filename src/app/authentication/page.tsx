'use client';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import LoginFormComponent from './components/loginform';
import SignUpForm from './components/signupform';

const AuthenticationPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <LoginFormComponent />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <SignUpForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
