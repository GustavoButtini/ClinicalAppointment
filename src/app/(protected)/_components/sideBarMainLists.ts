import {
  BriefcaseMedicalIcon,
  Calendar,
  CalendarDaysIcon,
  CalendarMinusIcon,
  CalendarPlusIcon,
  FileCogIcon,
  ImageMinusIcon,
  ImagePlusIcon,
  UserIcon,
  UserMinusIcon,
  UserPenIcon,
  UserRound,
  UserRoundMinusIcon,
  UserRoundPlusIcon,
} from 'lucide-react';

const clinicFunctionsList = [
  {
    title: 'Create Clinic',
    url: '/clinic/create',
    icon: ImagePlusIcon,
  },
  {
    title: 'Change Clinic',
    url: '/clinic/change',
    icon: FileCogIcon,
  },
  {
    title: 'Delete Clinic',
    url: '/clinic/create',
    icon: ImageMinusIcon,
  },
];
const accountFunctionsList = [
  {
    title: 'User Information',
    url: '/account/info',
    icon: UserIcon,
  },
  {
    title: 'Change User Information',
    url: '/account/change',
    icon: UserPenIcon,
  },
  {
    title: 'Delete User',
    url: '/account/delete',
    icon: UserMinusIcon,
  },
];
const extrasFunctionsList = [
  {
    title: 'See plans',
    url: '/plans',
    icon: FileCogIcon,
  },
  {
    title: 'LogOut',
    url: '/logout',
    icon: ImageMinusIcon,
  },
];

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
export const baseMenuItems = [
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
export const baseClinicList = {
  title: 'Clinics',
  icon: undefined,
  menu: clinicFunctionsList,
};
export const accountOptionsList = {
  title: 'Account',
  icon: undefined,
  menu: accountFunctionsList,
};
export const extrasOptionsList = {
  title: 'Extra Actions',
  icon: undefined,
  menu: extrasFunctionsList,
};
