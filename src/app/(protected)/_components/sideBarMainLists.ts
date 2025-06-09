const clinicFunctionsList = [
  {
    title: 'Create Clinic',
    url: '/clinic/create',
    icon: 'ImagePlus',
  },
  {
    title: 'Change Clinic',
    url: '/clinic/change',
    icon: 'FileCog',
  },
  {
    title: 'Delete Clinic',
    url: '/clinic/delete',
    icon: 'ImageMinus',
  },
];
const accountFunctionsList = [
  {
    title: 'User Information',
    url: '/account/info',
    icon: 'User',
  },
  {
    title: 'Change User Information',
    url: '/account/change',
    icon: 'UserPen',
  },
  {
    title: 'Delete User',
    url: '/account/delete',
    icon: 'UserMinus',
  },
];
const extrasFunctionsList = [
  {
    title: 'See plans',
    url: '/plans',
    icon: 'FileCog',
  },
  {
    title: 'LogOut',
    url: '/logout',
    icon: 'ImageMinus',
  },
];

// Menu items.
export const baseMenuItems = [
  {
    title: 'Doctors',
    icon: 'BriefcaseMedical',
    url: '/doctors',
  },
  {
    title: 'Pacients',
    icon: 'UserRound',
    url: '/patients',
  },
  {
    title: 'Appoitments',
    icon: 'CalendarDays',
    url: '/appoitments',
  },
];
export const baseClinicList = {
  title: 'Clinics',
  icon: 'Hospital',
  menu: clinicFunctionsList,
};
export const accountOptionsList = {
  title: 'Account',
  icon: 'User',
  menu: accountFunctionsList,
};
export const extrasOptionsList = {
  title: 'Extra Actions',
  icon: 'Plus',
  menu: extrasFunctionsList,
};
