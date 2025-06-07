import {
  BriefcaseMedical,
  CalendarDays,
  FileCog,
  Hospital,
  ImageMinus,
  ImagePlus,
  Plus,
  User,
  UserMinus,
  UserPen,
  UserRound,
  Wrench,
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.FC<any>> = {
  UserRound,
  UserPen,
  UserMinus,
  User,
  ImagePlus,
  ImageMinus,
  FileCog,
  CalendarDays,
  BriefcaseMedical,
  Hospital,
  Plus,
  Wrench, // default fallback
};

export function selectIcon(icon: string, props?: React.ComponentProps<'svg'>) {
  const IconComponent = iconMap[icon] || Wrench;
  return <IconComponent {...props} />;
}
