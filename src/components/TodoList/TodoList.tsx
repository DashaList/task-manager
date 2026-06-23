import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '@/utils/types';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) return null;

  return (
    <ul className="space-y-1 border-b border-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
