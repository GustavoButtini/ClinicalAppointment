'use client';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { selectIcon } from '../helpers/iconSelector';
import SidebarClinicOptions from './sidebarClinicOptions';

export type Menu = {
  title: string;
  url: string;
  icon: string | undefined;
};

const checkHasIcon = (
  icon: string | undefined,
  title: string,
  open: boolean,
) => {
  if (icon !== undefined) {
    return (
      <div className="flex h-full w-full flex-row content-between justify-between p-0">
        <div className="flex w-8/12 flex-row content-start justify-start gap-3">
          {selectIcon(icon, { className: 'min-h-6 min-w-6 self-center' })}
          <p
            className={
              title.length <= 7 ? 'text-2xl text-black' : 'text-xl text-black'
            }
          >
            {title}
          </p>
        </div>
        <div className="flex w-4/12 content-end justify-end">
          {open ? (
            <ChevronLeft className="min-h-5 min-w-5" />
          ) : (
            <ChevronDown className="min-h-5 min-w-5" />
          )}
        </div>
      </div>
    );
  } else {
    return <p className="text-2xl text-black">{title}</p>;
  }
};
interface CollapsibleMenuProps {
  title: string;
  icon: string | undefined;
  menu: Menu[];
  clinicIdVar: string | undefined;
}
const SidebarCollapsibleMenu = ({
  title,
  icon,
  menu,
  clinicIdVar,
}: CollapsibleMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible vertical py-6 pl-2 transition-all hover:bg-gray-100"
    >
      <SidebarGroup className="h-full p-0">
        <SidebarGroupLabel asChild className="p-0">
          <CollapsibleTrigger className="flex flex-row content-between justify-between">
            {checkHasIcon(icon, title, open)}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent
          className={cn(
            'text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none',
          )}
        >
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuSub className="space-y-2 py-4">
                {menu.map((item) => (
                  <SidebarClinicOptions
                    clinicId={clinicIdVar}
                    item={item}
                    key={item.title}
                  />
                ))}
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SidebarCollapsibleMenu;
