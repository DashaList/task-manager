import type { FC } from 'react';
import { Button } from '../ui';
import { Pencil, Trash2 } from 'lucide-react';

interface TodoItemButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TodoItemButtons: FC<TodoItemButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="pointer-events-none absolute right-2 top-2 flex opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:text-gray-900"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit task</span>
      </Button>
      {/* <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-gray-900"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="sr-only">Set due date</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-gray-900"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="sr-only">Add comment</span>
        </Button> */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:text-gray-900"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete task</span>
      </Button>
      {/* <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-gray-900"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More task actions</span>
        </Button> */}
    </div>
  );
};
