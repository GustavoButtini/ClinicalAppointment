'use client';
import { ChevronDown, ChevronLeft, CogIcon, HospitalIcon } from 'lucide-react';
import { useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { clinics } from '@/db/schema';

import SidebarBaseFunctionsMenu from './sidebarBaseFunctionsMenu';

interface SidebarUserClinics {
  clinics: (typeof clinics.$inferSelect)[];
}

const SidebarUserClinics = ({ clinics }: SidebarUserClinics) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="functions/collapsible vertical py-6 pl-2 transition-all hover:bg-gray-100"
    >
      <SidebarGroup className="h-full p-0">
        <SidebarGroupLabel asChild className="p-0">
          <CollapsibleTrigger className="flex flex-row content-between justify-between">
            <div className="flex w-8/12 flex-row content-start justify-start gap-3">
              <CogIcon className="min-h-6 min-w-6 self-center" />
              <p className="text-2xl text-black">Functions</p>
            </div>
            <div className="flex w-4/12 content-end justify-end">
              {open ? (
                <ChevronLeft className="min-h-5 min-w-5" />
              ) : (
                <ChevronDown className="min-h-5 min-w-5" />
              )}
            </div>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all">
          <SidebarMenu className="h-full gap-0">
            {clinics
              .filter((clinic) => clinic !== undefined && clinic !== null)
              .map((clinic) => (
                <SidebarMenuSub
                  key={clinic.name}
                  className="space-y-2 pt-4 pb-4"
                >
                  <Collapsible>
                    <SidebarGroup>
                      <SidebarGroupLabel asChild>
                        <CollapsibleTrigger className="flex flex-row content-center justify-start space-x-2">
                          <HospitalIcon className="min-h-5 min-w-5" />
                          <p className="text-sm text-black">{clinic.name}</p>
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <SidebarBaseFunctionsMenu id={clinic.id} />
                    </SidebarGroup>
                  </Collapsible>
                </SidebarMenuSub>
              ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SidebarUserClinics;
