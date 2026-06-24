import type { FC, SubmitEvent } from 'react';
import { TodoInput } from '../TodoInput';
import { useSuspenseQuery } from '@tanstack/react-query';
import { profileQueryOptions } from '@/utils/queries/profile';
import { useAddTaskMutation } from '@/utils/queries/tasks';
import { Todo } from '@/utils/types';

interface AddTodoInput {
  onClose: () => void;
}

export const AddTodoInput: FC<AddTodoInput> = ({ onClose }) => {
  const { data: profile } = useSuspenseQuery(profileQueryOptions());
  const { mutate: addTodo } = useAddTaskMutation();

  const initialTodo: Pick<Todo, 'text' | 'description' | 'projectId'> = {
    text: '',
    description: '',
    projectId: profile.defaultProjectId,
  };

  const handleAddTodo = (
    newTodo: Pick<Todo, 'text' | 'description' | 'projectId'>,
    e: SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (newTodo.text.trim()) {
      addTodo({
        text: newTodo.text.trim(),
        projectId: newTodo.projectId,
        description: newTodo.description?.trim() || undefined,
      });
    }
  };

  return (
    <TodoInput
      initialTodo={initialTodo}
      submitButtonText="Add task"
      onSubmit={handleAddTodo}
      onClose={onClose}
    />
  );
};
