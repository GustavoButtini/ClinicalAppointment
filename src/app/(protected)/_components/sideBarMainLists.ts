import {
  BriefcaseMedicalIcon,
  CalendarDaysIcon,
  FileCogIcon,
  ImageMinusIcon,
  ImagePlusIcon,
  UserIcon,
  UserMinusIcon,
  UserPenIcon,
  UserRound,
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

// Menu items.
export const baseMenuItems = [
  {
    title: 'Doctors',
    icon: BriefcaseMedicalIcon,
    url: '/doctors',
  },
  {
    title: 'Pacients',
    icon: UserRound,
    url: '/patients',
  },
  {
    title: 'Appoitments',
    icon: CalendarDaysIcon,
    url: '/appoitments',
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
