import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';

import SidebarCollapsibleMenu from './sidebarCollapsibleMenu';
import {
  accountOptionsList,
  baseClinicList,
  extrasOptionsList,
} from './sideBarMainLists';
import SidebarUserClinics from './sidebarUserClinics';

export const AppSidebar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect('/authentication');
  }
  return (
    <Sidebar>
      <SidebarContent className="gap-0">
        {/* Primary Options Menu */}
        <SidebarUserClinics clinics={session.user.clinics} />
        <Separator />
        {/* Clinics options:  */}
        <SidebarCollapsibleMenu
          title={baseClinicList.title}
          icon={baseClinicList.icon}
          menu={baseClinicList.menu}
          clinicIdVar={undefined}
        />
        <Separator />
        {/*Account options: */}
        <SidebarCollapsibleMenu
          title={accountOptionsList.title}
          icon={accountOptionsList.icon}
          menu={accountOptionsList.menu}
          clinicIdVar={undefined}
        />
        <Separator />
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
};
