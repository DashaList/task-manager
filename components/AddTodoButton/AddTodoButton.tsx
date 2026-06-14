import type { FC } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoButtonProps {
  onClick: () => void;
}

export const AddTodoButton: FC<AddTodoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 py-3 text-gray-500 hover:text-green-600"
    >
      <Plus className="h-5 w-5" />
      <span>Add task</span>
    </button>
  );
};
