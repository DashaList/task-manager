import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { Todo } from "@/utils/types";
import { useState } from "react";

export const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>(() => [
    { id: "1", text: "Something", completed: false },
    { id: "2", text: "Another task", completed: false },
    { id: "3", text: "Some task", completed: true },
  ]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 pt-16">
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">
        Frog Task Manager
      </h1>
      <TodoList
        todos={todos.filter((todo) => !todo.completed)}
        onToggleItem={toggleTodo}
        onDeleteItem={deleteTodo}
      />
      <TodoInput onAddTodo={addTodo} />
      <TodoList
        todos={todos.filter((todo) => todo.completed)}
        onToggleItem={toggleTodo}
        onDeleteItem={deleteTodo}
      />
    </div>
  );
};
