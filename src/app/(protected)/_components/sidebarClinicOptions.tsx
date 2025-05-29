import React from 'react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import { Menu } from './sidebarCollapsibleMenu';

interface ClinicOptionsProps {
  item: Menu;
  clinicId: string | undefined;
}

const SidebarClinicOptions = ({ item, clinicId }: ClinicOptionsProps) => {
  return (
    <SidebarMenuItem key={item.title} className="pt-3.5 pb-3.5">
      <SidebarMenuButton asChild>
        <a href={item.url + '/' + clinicId}>
          <item.icon />
          {item.title}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarClinicOptions;
