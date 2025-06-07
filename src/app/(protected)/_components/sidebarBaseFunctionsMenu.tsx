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

import { selectIcon } from '../helpers/iconSelector';
import { baseMenuItems } from './sideBarMainLists';
interface SideBarBaseProps {
  id: string;
}
const SidebarBaseFunctionsMenu = ({ id }: SideBarBaseProps) => {
  return (
    <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all">
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
                        {selectIcon(item.icon)}
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
