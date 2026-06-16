import { FC, FormEvent, useState } from 'react';
import { ProjectSelect } from '../ProjectSelect';
import { Button } from '../ui';
import { TodoInputControls } from './TodoInputControls';
import { getRouteApi } from '@tanstack/react-router';

interface TodoInputProps {
  onAddTodo: (text: string, projectId: string, description?: string) => void;
  onClose: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({ onAddTodo, onClose }) => {
  const routeApi = getRouteApi('/');
  const { defaultProjectId } = routeApi.useLoaderData().profile;

  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim(), projectId, description.trim() || undefined);
      onClose();
    }
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task name"
            autoFocus
            className="w-full border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border-0 bg-transparent p-0 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
        </div>

        <TodoInputControls />

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <ProjectSelect projectId={projectId} onChange={setProjectId} />

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
