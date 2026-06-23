import { FC, FormEvent, useState } from 'react';
import { ProjectSelect } from '../ProjectSelect';
import { Button } from '../ui';
import { TodoInputControls } from './TodoInputControls';
import { getRouteApi } from '@tanstack/react-router';
import { useAddTaskMutation } from '@/utils/queries/tasks';
import { Todo } from '@/utils/types';

interface TodoInputProps {
  onClose: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({ onClose }) => {
  const routeApi = getRouteApi('/');
  const { defaultProjectId } = routeApi.useLoaderData().profile;

  const initialTodo: Pick<Todo, 'text' | 'description' | 'projectId'> = {
    text: '',
    description: '',
    projectId: defaultProjectId,
  };

  const { mutate: addTodo } = useAddTaskMutation();

  const [todo, setTodo] = useState(initialTodo);
  const { text, description, projectId } = todo;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({ text: text.trim(), projectId, description: description?.trim() || undefined });
      setTodo(initialTodo);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setTodo((prev) => ({ ...prev, text: e.target.value }))}
            placeholder="Task name"
            autoFocus
            className="w-full border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setTodo((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="w-full border-0 bg-transparent p-0 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
        </div>

        <TodoInputControls />

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <ProjectSelect
            projectId={projectId}
            onChange={(projectId) => setTodo((prev) => ({ ...prev, projectId }))}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-sm font-normal"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-7 bg-green-600 text-sm font-normal hover:bg-green-700"
              disabled={!text.trim()}
            >
              Add task
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
