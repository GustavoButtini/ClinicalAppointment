'use client';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const QuitButton = () => {
  return (
    <Button
      onClick={() => {
        authClient.signOut();
        const delogger = async () => {
          toast.success('Você saiu com sucesso!', {
            description: 'Você será redirecionado para a página de login',
            action: {
              label: 'Fechar',
              onClick: () => {
                toast.dismiss();
              },
            },
          });
          await new Promise((resolve) => setTimeout(resolve, 500));
          redirect('/authentication');
        };
        delogger();
      }}
    >
      Sair
    </Button>
  );
};

export default QuitButton;
