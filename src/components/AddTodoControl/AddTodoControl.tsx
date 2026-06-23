import { FC, useState } from 'react';
import { AddTodoButton } from '../AddTodoButton';
import { TodoInput } from '../TodoInput';

export const AddTodoControl: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <AddTodoButton onClick={() => setIsEditing(true)} />;
  }

  return <TodoInput onClose={() => setIsEditing(false)} />;
};
