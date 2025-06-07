import React from 'react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import { selectIcon } from '../helpers/iconSelector';
import { Menu } from './sidebarCollapsibleMenu';

interface ClinicOptionsProps {
  item: Menu;
  clinicId: string | undefined;
}

const SidebarClinicOptions = ({ item, clinicId }: ClinicOptionsProps) => {
  return (
    <SidebarMenuItem key={item.title} className="px-2.5 py-4">
      <SidebarMenuButton asChild>
        <a
          href={clinicId !== undefined ? item.url + '/' + clinicId : item.url}
          className="flex flex-row content-center justify-start space-x-2 p-2"
        >
          {item.icon !== undefined ? (
            selectIcon(item.icon, { className: 'min-h-5 min-ww-5' })
          ) : (
            <></>
          )}
          <p className="text-sm text-black">{item.title}</p>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarClinicOptions;
