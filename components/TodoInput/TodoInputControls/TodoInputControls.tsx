import type { FC } from 'react';
import {
  Bell as BellIcon,
  Calendar as CalendarIcon,
  Flag as FlagIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'lucide-react';
import { Button } from '@/components/ui';

export const TodoInputControls: FC = () => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 gap-1 rounded-md text-gray-500 hover:text-gray-900"
      >
        <CalendarIcon className="h-4 w-4" />
        <span className="text-sm">Date</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 gap-1 rounded-md text-gray-500 hover:text-gray-900"
      >
        <FlagIcon className="h-4 w-4" />
        <span className="text-sm">Priority</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 gap-1 rounded-md text-gray-500 hover:text-gray-900"
      >
        <BellIcon className="h-4 w-4" />
        <span className="text-sm">Reminders</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-gray-500 hover:text-gray-900"
      >
        <MoreHorizontalIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
