import type { FC } from 'react';
import { Button } from '../ui';
import { Bell, ChevronDown, PanelLeft } from 'lucide-react';

const userName = 'dashalist';

export const AppSidebarHeader: FC = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <button className="flex min-w-0 items-center gap-2 rounded-md px-1 py-1 hover:bg-stone-100">
        <div className="flex size-7 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
          {userName[0]?.toUpperCase()}
        </div>

        <span className="truncate font-medium">{userName}</span>
        <ChevronDown className="size-4 text-stone-500" />
      </button>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="size-8">
          <Bell className="size-4" />
        </Button>

        <Button variant="ghost" size="icon" className="size-8">
          <PanelLeft className="size-4" />
        </Button>
      </div>
    </div>
  );
};
