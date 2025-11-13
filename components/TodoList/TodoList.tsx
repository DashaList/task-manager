import { FC } from 'react';
import { Todo } from '@/utils/types';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEditItem: (id: string) => (newTask: Partial<Todo>) => void;
  onDeleteItem: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, onEditItem, onDeleteItem }) => {
  if (todos.length === 0) return null;

  return (
    <ul className="space-y-1 border-b border-gray-200">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEditItem(todo.id)}
          onDelete={() => onDeleteItem(todo.id)}
        />
      ))}
    </ul>
  );
};
