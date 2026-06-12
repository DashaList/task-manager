import { FC, FormEvent, useState } from 'react';
import { ProjectSelect } from '../ProjectSelect';
import { Button } from '../ui';
import { TodoInputControls } from './TodoInputControls';
import { Plus } from 'lucide-react';
import { getRouteApi } from '@tanstack/react-router';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export const TodoInput: FC<TodoInputProps> = ({ onAddTodo }) => {
  const routeApi = getRouteApi('/');
  const { defaultProjectId } = routeApi.useLoaderData().profile;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 py-3 text-gray-500 hover:text-green-600"
      >
        <Plus className="h-5 w-5" />
        <span>Add task</span>
      </button>
    );
  }

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
              onClick={() => setIsEditing(false)}
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
