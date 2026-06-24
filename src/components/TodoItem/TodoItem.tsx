import { FC } from 'react';
import { TodoItemButtons } from '../TodoItemButtons';
import { ProjectNameView } from './ProjectNameVIew';
import { useDeleteTaskMutation, useEditTaskMutation } from '@/utils/queries/tasks';
import { Todo } from '@/utils/types';
import { Checkbox } from '@ui';

interface TodoItemProps {
  todo: Todo;
  onEdit: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { mutate: deleteTask } = useDeleteTaskMutation();
  const { mutate: editTask } = useEditTaskMutation();

  return (
    <li className="group relative flex min-h-20 items-start gap-3 rounded px-2 py-3 hover:bg-muted/50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() =>
          editTask({ taskId: todo.id, newTask: { completed: !todo.completed } })
        }
        id={`todo-${todo.id}`}
        className="mt-1 rounded-full"
      />
      <TodoItemButtons onEdit={onEdit} onDelete={() => deleteTask(todo.id)} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1 pr-36">
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
        </div>
        <div className="flex justify-end">
          <ProjectNameView projectId={todo.projectId} />
        </div>
      </div>
    </li>
  );
};
