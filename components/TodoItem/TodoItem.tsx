import { FC } from 'react';
import { Trash2 } from 'lucide-react';
import { Todo } from '@/utils/types';
import { Button, Checkbox } from '@ui';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => (
  <li className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 group">
    <Checkbox checked={todo.completed} onCheckedChange={onToggle} id={`todo-${todo.id}`} />
    <label
      htmlFor={`todo-${todo.id}`}
      className={`flex-1 cursor-pointer ${
        todo.completed ? 'line-through text-muted-foreground' : ''
      }`}
    >
      {todo.text}
    </label>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onDelete}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  </li>
);
