import { Todo } from "@/utils/types";
import { TodoItem } from "../TodoItem";
import { FC } from "react";

interface TodoListProps {
  todos: Todo[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  onToggleItem,
  onDeleteItem,
}) => {
  if (todos.length === 0) return null;

  return (
    <ul className="space-y-1 border-b border-gray-200">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleItem(todo.id)}
          onDelete={() => onDeleteItem(todo.id)}
        />
      ))}
    </ul>
  );
};
