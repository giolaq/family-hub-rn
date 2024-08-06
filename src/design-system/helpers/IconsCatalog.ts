import {
  CircleUser,
  LayoutDashboard,
  LayoutGrid,
  Timer,
  Settings,
  Play,
  Tv,
  Clapperboard,
  CalendarPlus,
  ClipboardList,
  MessageSquare
} from 'lucide-react-native';

export const iconsCatalog = {
  Tv: Tv,
  Clapperboard: Clapperboard,
  LayoutGrid: LayoutGrid,
  LayoutDashboard: LayoutDashboard,
  Timer: Timer,
  CircleUser: CircleUser,
  Settings: Settings,
  Play: Play,
  CalendarPlus: CalendarPlus,
  ClipboardList: ClipboardList,
  MessageSquare: MessageSquare
};

export type IconName = keyof typeof iconsCatalog;
