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
                    <ChartNoAxesColumnIncreasingIcon className="min-h-8 min-w-8 pt-1 pr-2" />
                    Dashboard
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </SidebarGroup>
            </Collapsible>
          </a>
          {baseMenuItems.map((item) => {
            return (
              <a href={item.url + '/' + id} key={item.title}>
                <Collapsible>
                  <SidebarGroup className="pl-1.5">
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <item.icon className="min-h-8 min-w-8 pt-1 pr-2" />
                        {item.title}
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                  </SidebarGroup>
                </Collapsible>
              </a>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </CollapsibleContent>
  );
};

export default SidebarBaseFunctionsMenu;
