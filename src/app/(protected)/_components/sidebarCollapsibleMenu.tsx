import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowDownIcon, LucideProps } from 'lucide-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

import { CollapsibleContent } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import SidebarClinicOptions from './sidebarClinicOptions';

export type Menu = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<LucideProps>;
};
const checkHasIcon = (
  icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >
    | undefined,
  title: string,
) => {
  if (icon !== undefined) {
    return (
      <>
        <div className="flex w-full content-center justify-start">
          <div className="flex content-start justify-start pr-2">
            {React.createElement(icon)}
          </div>
          {title}
        </div>
        <ArrowDownIcon />
      </>
    );
  } else {
    return <>{title}</>;
  }
};
declare global {
  // Extend the globalThis interface to include clinicId
  interface GlobalThis {
    clinicId?: string;
  }
}
(globalThis as GlobalThis).clinicId =
  (globalThis as GlobalThis).clinicId ?? undefined;
interface CollapsibleMenuProps {
  title: string;
  icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >
    | undefined;
  menu: Menu[];
  clinicIdVar: string | undefined;
}
const SidebarCollapsibleMenu = ({
  title,
  icon,
  menu,
  clinicIdVar,
}: CollapsibleMenuProps) => {
  return (
    <Collapsible defaultOpen={false} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full content-between justify-between">
            {checkHasIcon(icon, title)}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent
          className={cn(
            'text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 pl-5 outline-none',
          )}
        >
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarClinicOptions
                  clinicId={clinicIdVar}
                  item={item}
                  key={item.title}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SidebarCollapsibleMenu;
