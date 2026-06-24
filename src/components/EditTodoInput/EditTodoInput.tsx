import type { FC, SubmitEvent } from 'react';
import { TodoInput } from '../TodoInput';
import { useEditTaskMutation } from '@/utils/queries/tasks';
import { Todo } from '@/utils/types';

interface EditTodoInput {
  todo: Todo;
  onClose: () => void;
}

export const EditTodoInput: FC<EditTodoInput> = ({ todo, onClose }) => {
  const { mutate: editTask } = useEditTaskMutation();

  const handleEditTodo = (
    newTodo: Pick<Todo, 'text' | 'description' | 'projectId'>,
    e: SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (newTodo.text.trim()) {
      editTask({
        taskId: todo.id,
        newTask: {
          text: newTodo.text.trim(),
          projectId: newTodo.projectId,
          description: newTodo.description?.trim() || undefined,
        },
      });
      onClose();
    }
  };
  return (
    <TodoInput
      initialTodo={todo}
      submitButtonText="Save"
      onSubmit={handleEditTodo}
      onClose={onClose}
    />
  );
};
