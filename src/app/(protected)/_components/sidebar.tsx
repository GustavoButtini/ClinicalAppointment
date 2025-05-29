import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';

import SidebarBaseFunctionsMenu from './sidebarBaseFunctionsMenu';

export async function AppSidebar() {
  const sessions = await auth.api.getSession({ headers: await headers() });
  if (!sessions) {
    redirect('/authentication');
  }
  return (
    <Sidebar>
      <SidebarContent>
        {/* Primary Options Menu */}
        <Collapsible defaultOpen={true} className="functions/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>Functions</CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarMenu>
              {sessions.user.clinics
                .filter((clinic) => clinic !== undefined && clinic !== null)
                .map((clinic) => (
                  <SidebarMenuSub key={clinic.name}>
                    <Collapsible>
                      <SidebarGroup>
                        <SidebarGroupLabel asChild>
                          <CollapsibleTrigger>{clinic.name}</CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <SidebarBaseFunctionsMenu />
                      </SidebarGroup>
                    </Collapsible>
                  </SidebarMenuSub>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen={false} className="account/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>Clinics</CollapsibleTrigger>
            </SidebarGroupLabel>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen={false} className="account/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>Account</CollapsibleTrigger>
            </SidebarGroupLabel>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen={false} className="extras/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>Extras</CollapsibleTrigger>
            </SidebarGroupLabel>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
