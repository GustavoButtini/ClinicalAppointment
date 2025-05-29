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
import SidebarCollapsibleMenu from './sidebarCollapsibleMenu';
import {
  accountOptionsList,
  baseClinicList,
  extrasOptionsList,
} from './sideBarMainLists';

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
                        <SidebarBaseFunctionsMenu id={clinic.id} />
                      </SidebarGroup>
                    </Collapsible>
                  </SidebarMenuSub>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </Collapsible>
        {/* Clinics options:  */}
        <SidebarCollapsibleMenu
          title={baseClinicList.title}
          icon={baseClinicList.icon}
          menu={baseClinicList.menu}
          clinicIdVar={undefined}
        />
        {/*Account options: */}
        <SidebarCollapsibleMenu
          title={accountOptionsList.title}
          icon={accountOptionsList.icon}
          menu={accountOptionsList.menu}
          clinicIdVar={undefined}
        />
        {/*Extras options */}
        <SidebarCollapsibleMenu
          title={extrasOptionsList.title}
          icon={extrasOptionsList.icon}
          menu={extrasOptionsList.menu}
          clinicIdVar={undefined}
        />
      </SidebarContent>
    </Sidebar>
  );
}
