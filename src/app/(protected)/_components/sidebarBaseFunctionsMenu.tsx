import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { ChartNoAxesColumnIncreasingIcon } from 'lucide-react';
import React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';

import SidebarCollapsibleMenu from './sidebarCollapsibleMenu';
import { baseMenuItems } from './sideBarMainLists';
interface SideBarBaseProps {
  id: string;
}
const SidebarBaseFunctionsMenu = ({ id }: SideBarBaseProps) => {
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
                clinicIdVar={id}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </CollapsibleContent>
  );
};

export default SidebarBaseFunctionsMenu;
