import { Dispatch, SetStateAction, useState, type FC } from 'react';
import { EditTodoInput } from '../EditTodoInput';
import { TodoItem } from '../TodoItem';
import { Todo } from '@/utils/types';

interface TodoListItemProps {
  todo: Todo;
  editingTaskId: string | undefined;
  setEditingTaskId: Dispatch<SetStateAction<string | undefined>>;
}

export const TodoListItem: FC<TodoListItemProps> = ({ todo, editingTaskId, setEditingTaskId }) => {
  if (editingTaskId === todo.id) {
    return <EditTodoInput todo={todo} onClose={() => setEditingTaskId(undefined)} />;
  }

  return <TodoItem todo={todo} onEdit={() => setEditingTaskId(todo.id)} />;
};
