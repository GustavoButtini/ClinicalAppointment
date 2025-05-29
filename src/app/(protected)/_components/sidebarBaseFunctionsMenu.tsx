import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  BriefcaseMedicalIcon,
  Calendar,
  CalendarDaysIcon,
  CalendarMinusIcon,
  CalendarPlusIcon,
  ChartNoAxesColumnIncreasingIcon,
  UserRound,
  UserRoundMinusIcon,
  UserRoundPlusIcon,
} from 'lucide-react';
import React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';

import SidebarCollapsibleMenu from './sidebarCollapsibleMenu';
const doctorsMenuItems = [
  {
    title: 'Doctors',
    url: '/doctors',
    icon: UserRound,
  },
  {
    title: 'Create Doctor',
    url: '/doctors/create',
    icon: UserRoundPlusIcon,
  },
  {
    title: 'Delete Doctor',
    url: '/doctors/delete',
    icon: UserRoundMinusIcon,
  },
];

const clientsMenuItems = [
  {
    title: 'Clients',
    url: '/clients',
    icon: UserRound,
  },
  {
    title: 'Create Client',
    url: '/clients/create',
    icon: UserRoundPlusIcon,
  },
  {
    title: 'Delete Client',
    url: '/clients/delete',
    icon: UserRoundMinusIcon,
  },
];
const appoitmentsMenuItems = [
  {
    title: 'Appoitments',
    url: '/appoitment',
    icon: Calendar,
  },
  {
    title: 'Create Appoitment',
    url: '/appoitment/create',
    icon: CalendarPlusIcon,
  },
  {
    title: 'Delete Appoitment',
    url: '/appoitment/delete',
    icon: CalendarMinusIcon,
  },
];
// Menu items.
const baseMenuItems = [
  {
    title: 'Doctors',
    icon: BriefcaseMedicalIcon,
    menu: doctorsMenuItems,
  },
  {
    title: 'Clients',
    icon: UserRound,
    menu: clientsMenuItems,
  },
  {
    title: 'Appoitments',
    icon: CalendarDaysIcon,
    menu: appoitmentsMenuItems,
  },
];
const SidebarBaseFunctionsMenu = () => {
  return (
    <CollapsibleContent>
      <SidebarGroupContent className="w-full">
        <SidebarMenu>
          <a href="/dashboard">
            <Collapsible>
              <SidebarGroup className="pl-1.5">
                <SidebarGroupLabel asChild key="Dashboard">
                  <CollapsibleTrigger>
                    <ChartNoAxesColumnIncreasingIcon className="min-h-8 min-w-8" />
                    Dashboard
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </SidebarGroup>
            </Collapsible>
          </a>
          {baseMenuItems.map((item) => {
            return (
              <SidebarCollapsibleMenu
                title={item.title}
                icon={item.icon}
                menu={item.menu ?? []}
                key={item.title}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </CollapsibleContent>
  );
};

export default SidebarBaseFunctionsMenu;
