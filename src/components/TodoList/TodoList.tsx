import { Dispatch, FC, SetStateAction } from 'react';
import { TodoListItem } from '../TodoListItem';
import { Todo } from '@/utils/types';

interface TodoListProps {
  todos: Todo[];
  editingTaskId: string | undefined;
  setEditingTaskId: Dispatch<SetStateAction<string | undefined>>;
}

export const TodoList: FC<TodoListProps> = ({ todos, editingTaskId, setEditingTaskId }) => {
  if (todos.length === 0) return null;

  return (
    <ul className="space-y-1 border-b border-gray-200">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      ))}
    </ul>
  );
};
