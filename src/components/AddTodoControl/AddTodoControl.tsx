import { Dispatch, FC, SetStateAction, useState } from 'react';
import { AddTodoButton } from '../AddTodoButton';
import { AddTodoInput } from '../AddTodoInput';

interface AddTodoControlProps {
  editingTaskId: string | undefined;
  setEditingTaskId: Dispatch<SetStateAction<string | undefined>>;
}

export const AddTodoControl: FC<AddTodoControlProps> = ({ editingTaskId, setEditingTaskId }) => {
  if (editingTaskId === 'new-task') {
    return <AddTodoInput onClose={() => setEditingTaskId(undefined)} />;
  }

  return <AddTodoButton onClick={() => setEditingTaskId('new-task')} />;
};
