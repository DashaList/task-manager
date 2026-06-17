import { FC, useState } from 'react';
import { AddTodoButton } from '../AddTodoButton';
import { TodoInput } from '../TodoInput';

interface AddTodoControlProps {
  onAddTodo: (text: string, projectId: string, description?: string) => void;
}

export const AddTodoControl: FC<AddTodoControlProps> = ({ onAddTodo }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <AddTodoButton onClick={() => setIsEditing(true)} />;
  }

  return <TodoInput onAddTodo={onAddTodo} onClose={() => setIsEditing(false)} />;
};
