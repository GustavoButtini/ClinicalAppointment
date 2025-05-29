import React from 'react';

import { AppSidebar } from '@/app/(protected)/_components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
