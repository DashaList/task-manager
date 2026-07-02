import type { FC } from 'react';
import { AppSidebarItem } from '../AppSidebarItem';
import { Calendar, Inbox, LayoutGrid, Search } from 'lucide-react';

export const MainNav: FC = () => {
  return (
    <nav className="space-y-1">
      <AppSidebarItem icon={Search} label="Search" />
      <AppSidebarItem icon={Inbox} label="Inbox" count={38} />
      <AppSidebarItem icon={Calendar} label="Today" count={37} countClassName="text-red-500" />
      <AppSidebarItem icon={Calendar} label="Upcoming" />
      <AppSidebarItem icon={LayoutGrid} label="Filters & Labels" />
    </nav>
  );
};
