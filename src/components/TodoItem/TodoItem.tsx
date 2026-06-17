import { FC } from 'react';
import { ProjectNameView } from './ProjectNameVIew';
import { Trash2 } from 'lucide-react';
import { Todo } from '@/utils/types';
import { Button, Checkbox } from '@ui';

interface TodoItemProps {
  todo: Todo;
  onEdit: (newTask: Partial<Todo>) => void;
  onDelete: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <li className="group flex min-h-20 items-start gap-3 rounded px-2 py-3 hover:bg-muted/50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onEdit({ completed: !todo.completed })}
        id={`todo-${todo.id}`}
        className="mt-1 rounded-full"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <label
              htmlFor={`todo-${todo.id}`}
              className={`block cursor-pointer truncate text-base ${
                todo.completed ? 'text-muted-foreground line-through' : ''
              }`}
            >
              {todo.text}
            </label>
            {todo.description && (
              <p className="truncate text-sm text-gray-500">{todo.description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        <div className="flex justify-end">
          <ProjectNameView projectId={todo.projectId} />
        </div>
      </div>
    </li>
  );
};
