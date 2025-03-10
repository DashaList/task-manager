import { FC, FormEvent, useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export const TodoInput: FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
    <form onSubmit={handleSubmit} className="py-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Task name"
        autoFocus
        className="w-full border-0 border-b border-gray-300 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-0"
      />
    </form>
  );
};
